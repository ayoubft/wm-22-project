# Morocco Precipitations Dashboard <a target="_blank" href="https://precip-morocco.herokuapp.com/">🔗</a>

Full stack web app to visualize and forecast precipitations in Morocco <a target="_blank" href="https://precip-morocco.herokuapp.com/">🔗</a>.

![dashboard preview VF](https://user-images.githubusercontent.com/63267601/155906366-9ae14723-6896-43ad-9524-eef29609967c.png)

## Features

- **Visualize weather stations in Morocco with correspondant informations**

  ![Screenshot_20220228_164256](https://user-images.githubusercontent.com/63267601/156012615-392c0639-b116-479a-bd00-4a26e51803dd.png)

- **Visualize rainfall in Morocco per commune for every month of 2018**

  ![Screenshot_20220228_164418](https://user-images.githubusercontent.com/63267601/156012828-22c8c309-98c1-4476-8a21-8effb80b5b50.png)

- **Visualize water streams of Morocco**

- **Visualize raw rasters images of precipitations directly on the map**

  ![Screenshot_20220228_164525](https://user-images.githubusercontent.com/63267601/156013029-6ec20895-703f-49e7-9790-9379aa111e30.png)

- **Support SQL queries and render results in table**

  ![Screenshot_20220228_164618](https://user-images.githubusercontent.com/63267601/156013169-e8a98c29-4ff6-4ac3-a9ce-399f1136a773.png)

- **Supports Spatial SQL and render `geom` results in map**

  ![Screenshot_20220228_164817](https://user-images.githubusercontent.com/63267601/156013527-45214a09-c225-41b7-9a19-6a4e2316206d.png)

- **Forecasting rainfall using LSTM recurrent neural network, [check here](https://www.kaggle.com/yobfat/forecastingprecipkhouribgacommune/)**

  ![Screenshot_20220228_164923](https://user-images.githubusercontent.com/63267601/156013729-a587be52-2b7a-460d-be86-08ee0d48d0cf.png)

# Technologies

For this project, the following technologies were used, in addition to many tutorials and the documentation of each.

### Frontend

![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

### Backend

![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![pgsql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

### ML

![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![tf](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)
![]()

## Reproduce this work

[Jump to the wiki!](https://github.com/ayoubft/wm-22-project/wiki)

## Data

[Download page.](https://worldclim.org/data/monthlywth.html)

CRU-TS 4.03 (Harris et al., 2014) downscaled with WorldClim 2.1 (Fick and Hijmans, 2017).

Fick, S.E. and R.J. Hijmans, 2017. WorldClim 2: new 1km spatial resolution climate surfaces for global land areas. [International Journal of Climatology 37 (12): 4302-4315](https://rmets.onlinelibrary.wiley.com/doi/abs/10.1002/joc.5086%22).

Harris, I., P.D. Jones, T.J. Osborn, and D.H. Lister (2014), Updated high-resolution grids of monthly climatic observations - the CRU TS3.10 Dataset. International Journal of Climatology 34, 623-642. [doi:10.1002/joc.3711](doi:10.1002/joc.3711)
