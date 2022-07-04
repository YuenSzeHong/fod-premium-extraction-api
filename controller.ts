import axios from 'axios';
import * as moment from 'moment-timezone';
import { getTokenHeader, BASE_URL, API_URL } from './utils';

export const getSeriesDetails = async (req, res) => {
    const seriesid = req.query.seriesid;
    const tokenHeader = await getTokenHeader()
    const seriesDetails = await axios.
        get(`${API_URL}apps/api/lineup/detail/?lu_id=${seriesid}&is_premium=false&dv_type=web`,
            tokenHeader)
    const details = seriesDetails.data.detail;
    const detail = {
        id: details['lu_id'],
        title: details['lu_title'],
        description: details['description'],
        cast: details['cast_name'],
        noOfEps: seriesDetails.data['episodes'].length,
        poster: `${API_URL}img/program/${seriesid}/${seriesid}_a.jpg`
    }
    res.json(detail);
}

export const getEpisodeList = async (req, res) => {
    const seriesid = req.query.seriesid;
    if (!seriesid) {
        res.status(400).json({ message: 'seriesid is required' });
        return
    }
    const tokenHeader = await getTokenHeader()
    const seriesDetails = await axios.
        get(`${API_URL}apps/api/lineup/detail/?lu_id=${seriesid}&is_premium=false`,
            tokenHeader)
    const episodes = seriesDetails.data['episodes']
        .map(e => {
            return {
                id: e['ep_id'],
                title: e['ep_title'].replace(/([ |　]{1}[^『]*)/g, '　'),
                description: e['ep_description'],
                thumbnail: `${API_URL}img/program/${seriesid}/episode/${e['ep_id']}_a.jpg`
            }
        })
    res.json(episodes);
}

export const getVideo = async (req, res) => {
    const videoid = req.query.videoid;
    if (!videoid) {
        res.status(400).json({ message: 'videoid is required' });
        return
    }
    const videoSources = await axios.
        get(`${API_URL}abrjson_v2/tv_android/${videoid}`)
    const sources = videoSources.data.video_selector
        .map(v => {
            return {
                quality: v.title,
                url: v.url,
            }
        })
    res.json(sources);
}

export const getVideoDetails = async (req, res) => {
    const videoid = req.query.videoid;
    const tokenHeader = await getTokenHeader()
    try {
    const videoDetails = await axios.
        get(`${API_URL}apps/api/episode/detail/?ep_id=${videoid}&is_premium=false`, tokenHeader)
    const details = {
        title: videoDetails.data['ep_title'],
        description: videoDetails.data['ep_description'],
        duration: videoDetails.data['duration'],
        release: moment.tz(videoDetails.data['ep_release_date'], 'Asia/Tokyo').
            tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm'),
        thumbnail: `${API_URL}img/program/${videoid.slice(0, 4)}/episode/${videoid}_a.jpg`
    }
    res.json(details);
    } catch(e) {
        res.status(500).json({ message: 'video not found' });
    }

}


