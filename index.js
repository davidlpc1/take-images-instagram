const puppeteer = require('puppeteer')
const fs = require('fs')

const InstagramRobot = async(user) => {
    try{
        const browser = await puppeteer.launch({ headless:true });
        const page = await browser.newPage();
        await page.goto(`https://instagram.com/${user}`);
    
        const imagesLists = await page.evaluate(() => {
            const nodeList = document.querySelectorAll('article img')
            const imageArray = [...nodeList];
            const srcOfAllIMages = imageArray.map(
                ({ src }) => ({ src })
            )
            return srcOfAllIMages
        })
        
        fs.writeFile(`instagram-${user}.json`, JSON.stringify(imagesLists,null,4),err => {
            if(err) throw new Error(err)
        })
    
        await browser.close();
        console.log('Everthing OK')
    }catch(err){
        console.log('----------------------------------')
        console.log(err.message)
        console.log('----------------------------------')
    }

}

InstagramRobot('davidlpc1')