# Fujitv FOD Premium extraction API

## Set up

### .env file

```env
API_URL = 'https://i.fod.fujitv.co.jp/'
PORT = 3000
```

### Routes

#### Series Details

GET `/series`
Param: `seriesid`
Return:

```js
{
    "id": string, // id of series
    "title": string, // title of series
    "description": string, // description of series
    "cast": string, // cast of series
    "noOfEps": number, // number of episodes in series
}
```

#### Series Episode List

GET `/episodes`
Param: `seriesid`
Return:

```js
{
    [
        {
            "id": string, // id of episode
            "title": string, // title of episode
            "description": string, // description of episode
            "thumbnail": string // thumbnail URL of episode
        }
    ]
}
```

```json
{
    "id": "5d40110001",
    "title": "#1244　『まる子、ノラ犬に追いかけられる』の巻",
    "description": "はまじが学校帰りにノラ犬に追いかけられて足を噛まれてしまった。学校近くでノラ犬を見かけた人がおり、まだこの辺にいることを知ったまる子たちは怖くて仕方がない。もしもの時はどうする？あれこれ考えるが心配は募るばかり。まる子の運命やいかに・・・？",
    "thumbnail": "https://i.fod.fujitv.co.jp/img/program/5d40/episode/5d40110001_a.jpg"
}
```

#### Single Episode detail

GET `/video/detail`
Param: `videoid`
Return:

```json
{
    "title": "#1324 『まる子とオニの子』の巻／『結成！2月をムダにしない会』の巻",
    "description": "まる子とたまちゃんが節分の話をしていると、山田が大好きな鬼の絵本を見せてくれた。ある日、まる子たちが公園で鬼ごっこをして遊んでいると、節子ちゃんと言う女の子に出会うのだが…／山根が、2月は28日しかないから、無駄に過ごしたくないと言う。どんな2月を過ごすか、一緒に考えてほしいと言われたまる子。【2月をムダにしない会】を結成することになった。",
    "duration": "24分",
    "release": "2022-02-06 17:30",
    "thumbnail": "https://i.fod.fujitv.co.jp/img/program/5d40/episode/5d40110083_a.jpg"
}
```

#### Single Episode Source

GET `/video/detail`
Param: `videoid`
Return:

```js
[
    {
        "quality": "自動", // auto
        "url": "https://hls-vod-auth.stream.co.jp/hls-vod-auth/fod-wse-abr/meta.m3u8?tk=f0569c9d9998793154b373fbf13f32dc2b36bfc740fd15b48362f82a29d11d77"
    },
    {
        "quality": "低", // low
        "url": "https://hls-vod-auth.stream.co.jp/hls-vod-auth/fod-wse-mid/meta.m3u8?tk=d04d8dbb3519e2d7269c336af131bc010a49fd9c3213e5179e5150b801c77300c6fcf05a6d8fa970c106baebdc901e78"
    },
    {
        "quality": "高", // high
        "url": "https://hls-vod-auth.stream.co.jp/hls-vod-auth/fod-wse-high/meta.m3u8?tk=d04d8dbb3519e2d7269c336af131bc01716c7e9ae4c18c7c6845e1b607c91eb22c74b1e85677d9ddb458fa39104e79cb"
    }
]
```
