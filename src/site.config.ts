interface Link {
	name : string;
	url: string
}

interface SiteConfig {
	author: string;
	title: string;
	description: string;
	lang: string;
	ogLocale: string;
	themeColor: string;
	menuLinks: Link[];
	socialLinks: Link[];
}

export const siteConfig: SiteConfig = {
	author: "Sebastien LOVERGNE",
	title: "Sebastien LOVERGNE",
	description: "A site about me and my interests",
	lang: "en-US",
	ogLocale: "en_US",
	themeColor: "#0ac8f5",
	menuLinks: [
		{name: "Home", url: "/"},
		{name: "Projects", url: "/projects"},
		{name: "Reading lists", url: "/readings"},
		{name: "Resume", url: "/resume"},
		{name: "RSS", url: "/rss.xml"},

	],
	socialLinks: [
		{name: "github", url: "https://github.com/TheBigRoomXXL"},
		{name: "itch.io", url: "https://tehbigroomxxl.itch.io/"},
		{name: "email", url: "sebastien@lovergne.dev"},
	],
};
