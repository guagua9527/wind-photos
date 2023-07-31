

export type Portfolio = {
    id: number;
    name: string;
    tag: string[];
    description: string;
    coverImage: string;
    createTime: string;
    updateTime: string;
}

export type PortfolioTag = {
    name: string;
    cover: string;
    useCount: number;
}

export type PortfolioPhoto = {
    id: number;
    portfolioId: number;
    name: string;
    cameraParam: string;
    description: string;
    createTime: string;
    image: string;
}
