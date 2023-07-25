export type PortfolioType = "landscape" | "portrait" | "product" | "still-life";

export type Portfolio = {
    name: string;
    type: PortfolioType;
    description: string;
    cover: string;
    createTime: string
}

export type PortfolioTypeItem = {
    name: string;
    type: PortfolioType,
    image: string;
}
