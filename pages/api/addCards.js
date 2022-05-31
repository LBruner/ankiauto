import {launchPuppeteer} from "../../lib/puppetterHelper";
import * as path from "path";
import {readFile, writeFile} from 'fs/promises';

const addedPostsPath = path.resolve(__dirname, process.cwd(), 'lib', 'addedPosts.json')

export default async function handler(req, res) {
    const {page, browser} = await launchPuppeteer();

    if (req.method === 'POST') {

        let filteredPosts = await fetchNewPosts(page);

        const postsData = await getPostsData(filteredPosts);
        
        console.log(filteredPosts)
        console.log(postsData)
        await browser.close();
        res.json({message: 'success!'})
    }
}

async function getPostsData(posts){
    
}

async function fetchNewPosts(page) {
    let allPagePosts = await getPostsPerPage(1, page)

    let filteredPosts = await filterPosts([], allPagePosts, 1, page);

    if (filteredPosts.length !== 0)
        await recordAddedPost(filteredPosts[0], addedPostsPath);
    
    return filteredPosts;
}

async function filterPosts(filteredPosts, allPagePosts, pageIndex, puppeteer) {
    let newArray;
    let isAdded = false;

    const lastPostTitle = await readLatestAddedPost()

    allPagePosts.forEach((post, i) => {
        if (!isAdded) {
            if (post.title === lastPostTitle) {
                newArray = allPagePosts.slice(0, i);
                isAdded = true;
            } else {
                filteredPosts.push(post);
            }
        }

    })
    if (isAdded) {
        return filteredPosts;
    } else {
        const newPagePosts = await getPostsPerPage(pageIndex + 1, puppeteer)
        return filterPosts(filteredPosts, newPagePosts, pageIndex + 1, puppeteer)
    }
}

const getPostsPerPage = async (pageIndex, puppeteer) => {
    const currentPage = `https://www.mairovergara.com/category/phrasal-verbs/page/${pageIndex}/`
    return await fetchPosts(puppeteer, currentPage)
}

async function fetchPosts(puppeteer, url) {
    await puppeteer.goto(url)

    return await puppeteer.evaluate(() => {
        const posts = Array.from(document.querySelectorAll('.td_module_1 .entry-title'));

        const data = [];
        for (let post of posts) {
            data.push({title: post.innerText, link: post.firstChild.href})
        }

        return data;
    });
}

async function readLatestAddedPost() {
    const post = await readFile(addedPostsPath, 'utf-8');
    const data = JSON.parse(post);
    return data.title;
}

async function recordAddedPost(filteredPost) {
    const postTitle = JSON.stringify({title: filteredPost.title})

    await writeFile(addedPostsPath, postTitle, {flag: 'w'})
}
