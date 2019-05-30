const pageConfig = {
	countLoadAdv: 0,
	search: '',
	searchTags: '',
	limit: 2,
	selectedTags: -1,
    setTags: new Set(),
    scroll: 0
}

document.addEventListener('DOMContentLoaded', loadPage);

function loadPage(_event) {
    window.addEventListener('scroll', loadNextAdventure);
}

function loadNextAdventure(_event) {
    if (isScrolledDown()) {
        pageConfig.countLoadAdv += pageConfig.limit;
        loadNextAdventurePage();
      }
}

function isScrolledDown() {
    const canScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentlyScrolled = window.scrollY;
    const epsilon = 1;
    if ( canScroll - currentlyScrolled < epsilon && pageConfig.scroll < currentlyScrolled ) {
        pageConfig.scroll = currentlyScrolled;
      return true;
    }
  
    return false;
  }

const searchInput = document.querySelector('.search-adventure');
const searchTags = document.querySelector('.search-tags');
const submitBtSearch = document.querySelector('.bt__search');
const body = document.getElementsByTagName('body');

let listTags = document.getElementById('list-tags');
let tags = document.getElementById('selected-tags');

body[0].addEventListener('click', closeListTags);
searchTags.addEventListener('input', event => {
pageConfig.searchTags = event.target.value;
fiendTags();
});

searchInput.addEventListener('keydown', pushEnter)
searchInput.addEventListener('input', event => {
	pageConfig.search = event.target.value;
});

submitBtSearch.addEventListener('click', submit);
searchTags.addEventListener('keydown', handleKeystroke);

function pushEnter(event) {
    if (event.key === 'Enter') {
        submit();
    }
}

async function fiendTags() {
	const url = `/hashtags?fiendTags=${pageConfig.searchTags}`;
    const response = await fetch(url).then(res => {
        return res.json();
    }).catch(er => console.error(er));
    addTags(response);
}

function addTags(result) {
    listTags.hidden = false;
    listTags.innerHTML = '';
    pageConfig.selectedTags = -1;
    result.forEach(el => {
        if (!pageConfig.setTags.has(el.hash)) {
            let li = document.createElement('li');
            li.innerHTML = el.hash;
            li.classList.add('item__tag');
            li.onclick = function () { choice(el.hash); }
            listTags.appendChild(li);
        }
    });
}

function choice(el) {
	pageConfig.setTags.add(el);
	searchTags.value = '';
	addTagsInView(el)
	closeListTags();
}


function submit() {
    let advList = document.getElementById('adventure-list');
    advList.innerHTML = '';
    pageConfig.scroll = 0;
    pageConfig.countLoadAdv = 0;
    loadNextAdventurePage();
}

async function loadNextAdventurePage() {  
    const {limit, search, setTags: setTags, countLoadAdv} = pageConfig;
    const url = `/adventures?limit=${limit}&loadADV=${countLoadAdv}&search=${search}&arrTags=${[...setTags].join(' ')}`;
    const response = await fetch(url).then(res => res.json()).catch(error => {
		console.error(error)});
    renderAdventure(response);
}

function handleKeystroke(event) {
	let listTags = document.querySelector('.list-tags').children;
	switch (event.key) {
		case 'ArrowDown':
			pageConfig.selectedTags++;
			  arrowDown(listTags)
		break;
	  case 'ArrowUp':
			pageConfig.selectedTags--;
			arrowUp(listTags);
		break;
		case 'Enter':
		event.preventDefault();
		event.target.value = '';
		selectedTeg(listTags);
		break;
	}
}

function arrowDown(listTags) {
    if ([...listTags].length === pageConfig.selectedTags) {
        pageConfig.selectedTags--;
        return;
    }
    if (0 !== pageConfig.selectedTags) {
        listTags[pageConfig.selectedTags-1].classList.toggle('focused');
    }
    listTags[pageConfig.selectedTags].classList.toggle('focused');
}
	
function arrowUp(listTags) {
    
    if (-1 >= pageConfig.selectedTags) {
        listTags[pageConfig.selectedTags+1].classList.toggle('focused');
        pageConfig.selectedTeg = -1;
        return;
    }  
    listTags[pageConfig.selectedTags+1].classList.toggle('focused');
    listTags[pageConfig.selectedTags].classList.toggle('focused');
}

function selectedTeg(listTags) {
	if (-1 === pageConfig.selectedTags) {
		return;
    }
	pageConfig.setTags.add(listTags[pageConfig.selectedTags].innerHTML);
	addTagsInView(listTags[pageConfig.selectedTags].innerHTML);
	closeListTags();
}
	
function closeListTags() {
	listTags.hidden = true;
}

function addTagsInView(tag) {
	let li = document.createElement('li');
	li.innerHTML = `#${tag}<span class="link link__tags">X</span>`;
	li.classList.add('tag');
	li.id = tag;
	li.onclick = function () { deleteTag(tag); }
	tags.appendChild(li);
}

function deleteTag(tag) {
	pageConfig.setTags.delete(tag);
	let delTags = document.getElementById(tag);
	delTags.remove();
}

function renderAdventure(render) {
    let advList = document.getElementById('adventure-list');
    const {adventures, staticBasePath} = render;
	adventures.forEach(el => {
        let li = document.createElement('li');
        li.classList.add('adventure-list__item');
        generateItem(li, el, staticBasePath);
        advList.append(li);
    });
}

function generateItem(item, el, staticBasePath) {
    let a = document.createElement('a');
    a.setAttribute('href', `/${ el.titleEN }/start`);
    a.classList.add('link');
    let img = document.createElement('img');
    if (el.img) {
        img.setAttribute('src',`${staticBasePath}img/${el.img}`);
        img.setAttribute('alt',`${el.img}`);
    } else {
        img.setAttribute('src',`${staticBasePath}img/img/default-adv.png`);
        img.setAttribute('alt','картинка приключения');
    }
    a.appendChild(img);

    let section = document.createElement('section');
    section.classList.add('adventure__item-description');
    let linkDescription = document.createElement('a');
    linkDescription.setAttribute('href', `/${ el.titleEN }/start`);
    linkDescription.classList.add('link');
    linkDescription.innerHTML = el.title;
    section.appendChild(linkDescription);
    let p = document.createElement('p');
    p.classList.add('item-description');
    p.innerHTML = el.description
    section.appendChild(p);

    let sectionItemTags = document.createElement('section');
    sectionItemTags.classList.add('item__tags');
    el.tags[0].adventures.forEach(adv => {
        if(adv.title === el.title) {
            adv.tags.forEach(tag => {
                let a = document.createElement('a');
                a.setAttribute('href', `/tags/${tag.hashEN}`);
                a.classList.add('link-tags','link');
                let bt = document.createElement('button');
                bt.classList.add('bt__tags');
                bt.innerHTML = '#' + tag.hash;
                a.appendChild(bt);
                sectionItemTags.appendChild(a);
            });
    }
    })
    
    section.appendChild(sectionItemTags); 

    item.appendChild(a);
    item.appendChild(section);
}
