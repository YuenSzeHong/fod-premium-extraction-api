import * as express from 'express';
import * as dotenv from 'dotenv';
import {
    getSeriesDetails,
    getEpisodeList,
    getVideo,
    getVideoDetails
} from './controller';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config()

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/series',getSeriesDetails);

app.get('/episodes', getEpisodeList);

app.get('/video/details', getVideoDetails);

app.get('/video', getVideo);