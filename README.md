# Morocco Precipitations Dashboard

Full stack web app to visualize and forecast precipitations in Morocco.

![dashboard preview VF](https://user-images.githubusercontent.com/63267601/155906366-9ae14723-6896-43ad-9524-eef29609967c.png)

## Features

- **Visualize weather stations in Morocco with correspondant informations**

- **Visualize rainfall in Morocco per commune for every month of 2018**

- **Visualize water streams of Morocco**

- **Visualize raw rasters images of precipitations directly on the map**

- **Support SQL queries and render results in table**

- **Supports Spatial SQL and render `geom` results in map**

- **Forecasting rainfall using LSTM recurrent neural network, [check here](https://www.kaggle.com/yobfat/forecastingprecipkhouribgacommune/)**

# Technologies

### Frontend

![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend

![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![pgsql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

### ML

![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![tf](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white)
![]()

## Data

[Download page.](https://worldclim.org/data/monthlywth.html)

CRU-TS 4.03 (Harris et al., 2014) downscaled with WorldClim 2.1 (Fick and Hijmans, 2017).

Fick, S.E. and R.J. Hijmans, 2017. WorldClim 2: new 1km spatial resolution climate surfaces for global land areas. [International Journal of Climatology 37 (12): 4302-4315](https://rmets.onlinelibrary.wiley.com/doi/abs/10.1002/joc.5086%22).

Harris, I., P.D. Jones, T.J. Osborn, and D.H. Lister (2014), Updated high-resolution grids of monthly climatic observations - the CRU TS3.10 Dataset. International Journal of Climatology 34, 623-642. [doi:10.1002/joc.3711](doi:10.1002/joc.3711)
