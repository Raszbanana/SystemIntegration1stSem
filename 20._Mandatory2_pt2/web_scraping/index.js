import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import dayjs from 'dayjs';

// Function to scrape Reddit front page titles
const scrapeRedditTitles = async () => {
  try {
    // Fetch the Reddit front page HTML
    const response = await axios.get('https://www.reddit.com');
    const html = response.data;

    // Use Cheerio to parse the HTML
    const $ = load(html);

    // Select the thread titles using CSS selectors
    const titles = [];
    $('h3._eYtD2XCVieq6emjKBH3m').each((index, element) => {
      titles.push($(element).text());
    });

    console.log('Todays reddit frontpage titles! ');
    for (let i = 0; i < titles.length; i++) {
      console.log(`Thread ${i + 1}: ${titles[i]}`);
    }

    const currentDate = dayjs().format('YYYY-MM-DD');

    fs.writeFileSync(
      `./reddit_frontpage_titles_history/reddit_frontpage_titles_${currentDate}.txt`,
      titles.join('\n'),
      'utf8',
      (err) => {
        if (err) {
          console.log('Error writing file:', err);
        } else {
          console.log('File is written successfully!');
        }
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
};

scrapeRedditTitles();
