export interface IAdventure {
    id: number;
    titleEN: string;
    title: string;
    description: string;
    img: string;
    tags: [];
    scenes?: [];
}

export interface IScene {
    achievements: [];
    buttons: [];
    description: string;
    image: string;
    positionDescription: string;
}

export interface IButton {
    nextAction: string;
    name: string;
}

export interface IAchievements {
    image: string;
    medal: string;
}

export interface IAdventureData {
    adventures: IAdventure[];
    staticBasePath: string;
}

export interface ISceneData {
    scene: IScene;
    staticBasePath: string;
}

export interface ITag {
    hashEN: string;
    hash: string;
    id: number;
}

export interface IUserData {
    login: string;
    password: string;
    salt?: string;
}

export interface IRegistrationData {
    avatar: string;
    login: string;
    password: string;
    salt: string;
}
