import axios from "axios";
import cheerio from 'cheerio';



const scorecardFunction = async (prop: any) => {
    const url = `https://www.cricbuzz.com/api/html/cricket-scorecard/${prop}`;
    const scorecard1: { Player: string; Dismissal: string; Runs: string; Balls: string; Fours: string; Sixes: string; StrikeRate: string; }[] = [];
    const scorecard2: { Player: string; Dismissal: string; Runs: string; Balls: string; Fours: string; Sixes: string; StrikeRate: string; }[] = [];
    const team1 = [];
    const team2 = [];
    const full = [];
    let status = "";
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const $ = cheerio.load(response.data);

            const playersContainer1 = $('#innings_1');
            const playersContainer2 = $('#innings_2');

            const headerRow1 = playersContainer1.find('.cb-scrd-hdr-rw span');
            team1.push(headerRow1.eq(0).text());
            team1.push(headerRow1.eq(1).text());
            const headerRow2 = playersContainer2.find('.cb-scrd-hdr-rw span');
            team2.push(headerRow2.eq(0).text());
            team2.push(headerRow2.eq(1).text());

            const playerItems1 = playersContainer1.find('.cb-col-100.cb-scrd-itms');
            const playerItems2 = playersContainer2.find('.cb-col-100.cb-scrd-itms');


            status = $('.cb-col.cb-scrcrd-status.cb-col-100.cb-text-live').text().trim() || $('.cb-col.cb-scrcrd-status.cb-col-100.cb-text-complete').text().trim();

            playerItems1.each((index, element) => {
                const player = $(element);
                const playerName = player.find('.cb-text-link').text().trim();
                const dismissalInfo = player.find('.cb-col-33').text().trim();
                const runs = player.find('.cb-col-8.text-bold').text().trim();
                const balls = player.find('.cb-col-8.text-right').eq(1).text().trim();
                const fours = player.find('.cb-col-8.text-right').eq(2).text().trim();
                const sixes = player.find('.cb-col-8.text-right').eq(3).text().trim();
                const strikeRate = player.find('.cb-col-8.text-right').eq(4).text().trim();

                const score = {
                    Player: playerName,
                    Dismissal: dismissalInfo,
                    Runs: runs,
                    Balls: balls,
                    Fours: fours,
                    Sixes: sixes,
                    StrikeRate: strikeRate,
                }
                scorecard1.push(score);

            });
            playerItems2.each((index, element) => {
                const player = $(element);
                const playerName = player.find('.cb-text-link').text().trim();
                const dismissalInfo = player.find('.cb-col-33').text().trim();
                const runs = player.find('.cb-col-8.text-bold').text().trim();
                const balls = player.find('.cb-col-8.text-right').eq(1).text().trim();
                const fours = player.find('.cb-col-8.text-right').eq(2).text().trim();
                const sixes = player.find('.cb-col-8.text-right').eq(3).text().trim();
                const strikeRate = player.find('.cb-col-8.text-right').eq(4).text().trim();

                const score = {
                    Player: playerName,
                    Dismissal: dismissalInfo,
                    Runs: runs,
                    Balls: balls,
                    Fours: fours,
                    Sixes: sixes,
                    StrikeRate: strikeRate,
                }
                scorecard2.push(score);

            });
        } else {
            console.log(`Failed to fetch the page. Status Code: ${response.status}`);
        }
        full.push(scorecard1);
        full.push(scorecard2);
        full.push(status);
        full.push(team1);
        full.push(team2);
        return full;
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw error;
    }
};

export default scorecardFunction;
