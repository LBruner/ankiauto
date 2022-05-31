import {launchPuppeteer} from "../../lib/puppetterHelper";
import addedPosts from "../../lib/addedPosts";

export default async function handler(req, res) {
    const {page, browser} = await launchPuppeteer();
    if (req.method === 'POST') {

        let allPagePosts = await getPostsPerPage(1, page)

        let filteredPosts = await filterPosts([], allPagePosts, 1, page);
        console.log(filteredPosts)
        res.json({message: 'success!'})
    }
    await browser.close();
}

async function filterPosts(filteredPosts, allPagePosts, pageIndex, puppeteer) {
    let newArray;
    let isAdded = false;
    allPagePosts.forEach((post, i) => {
        if (!isAdded) {
            if (post.title === addedPosts.lastPost) {
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
