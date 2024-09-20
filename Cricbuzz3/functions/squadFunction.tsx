import axios from "axios";
import cheerio from 'cheerio';

async function fetchPlayerDetails(prop: any) {
    const url = `https://www.cricbuzz.com/api/html/match-squads/${prop}`;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const playingXISelectorLeft = '.cb-col.cb-col-50.cb-play11-lft-col';
        const playingXISelectorRight = '.cb-col.cb-col-50.cb-play11-rt-col';
        const playersLeft: { name: string; role: string; image: string | undefined; }[] = [];
        const playersRight: { name: string; role: string; image: string | undefined; }[] = [];
        const players = [];
        const flag = [];
        const team = [];

        const team1Image = $('.cb-team1 img').attr('src');
        const team2Image = $('.cb-team2 img').attr('src');
        const team1 = $('.cb-team1').text().trim();
        const team2 = $('.cb-team2').text().trim();
        flag.push(team1Image);
        flag.push(team2Image);
        team.push(team1);
        team.push(team2);

        $(playingXISelectorLeft).find('.cb-col.cb-col-100.pad10.cb-player-card-left').each((index, element) => {
            if ($(element).find('.cb-player-name-left div:first-child').text().trim()) {
                const playerName = $(element).find('.cb-player-name-left div:first-child').text().trim().split('  ')[0];
                const playerRole = $(element).find('.cb-font-12.text-gray').text().trim();
                const playerImage = $(element).find('.cb-plyr-img-left').attr('src');

                playersLeft.push({
                    name: playerName,
                    role: playerRole,
                    image: playerImage,
                });
            }
        });

        $(playingXISelectorRight).find('.cb-col.cb-col-100.pad10.cb-player-card-right').each((index, element) => {
            if ($(element).find('.cb-player-name-right div:first-child').text().trim()) {

                const playerName = $(element).find('.cb-player-name-right div:first-child').text().trim().split('  ')[0];
                const playerRole = $(element).find('.cb-font-12.text-gray').text().trim();
                const playerImage = $(element).find('.cb-plyr-img-right').attr('src');

                playersRight.push({
                    name: playerName,
                    role: playerRole,
                    image: playerImage,
                });
            }
        });

        players.push(playersLeft);
        players.push(playersRight);
        players.push(flag);
        players.push(team);

        return players;
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw error;
    }
}

export default fetchPlayerDetails;
