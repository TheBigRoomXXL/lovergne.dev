import { h1, paragraph } from "src/components.txt/formatter"
import { Header } from "src/components.txt/Header.txt"
import { Footer } from "src/components.txt/Footer";
import { Activity } from "src/components.txt/Activity.txt";
import { getCollection } from "astro:content";

export async function GET() {
    return new Response(
        Header() +
        h1("Hello World!") +
        paragraph(`Welcome! My name is Sebastien Lovergne. I'm an inveterate 
        tinkerer and I work as a software engineer.`) +
        paragraph(`This website is a place where I can experiment and be creative. I write
      about some of my personal projects when I think they are interesting
      enough and I'm not too lazy to write. I also publish links to external
      resources that I have found interesting or thought-provoking. Think of
      it as my personal web archive.`) +
        paragraph(`You can find me as @TheBigRoomXXL on github and itch.io`) +
        Activity() +
        Footer()
    )
}

