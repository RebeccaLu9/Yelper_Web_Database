const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler) 
//没用
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    res.send(`Hello! Welcome to the Yelp server!`)
    // if (req.query.name) {
    //     res.send(`Hello, ${req.query.name}! Welcome to the Yelp server!`)
    // } else {
    //     res.send(`Hello! Welcome to the Yelp server!`)
    // }
}


/* ---- Query 1, Find basic operation information of all businesses by location (city, state) search, eg. Boston, MA ---- */
//没用，但功能web上实现了
const searchByLocation = (req, res) => {
    console.log('Search all businesses by location (city, state), eg. Boston, MA:');
    var state = req.params.state
    var city = req.params.city
    const query = `
    SELECT business_id, name, address, city, state, postal_code, stars, review_count   
    FROM business 
    WHERE state = '${state}' AND city = '${city}'
    ORDER BY stars, review_count DESC LIMIT 10
    `;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Query 2, Find basic information of restaurants by name search ---- */
//没用，但功能web上实现了
const searchByName = (req, res) => {
    var name = req.params.name//req.query.name ? req.query.name: 'good'
    console.log('Find basic information of restaurants by name search:');
    const query = `
    SELECT business_id, name, address, city, state, postal_code, stars, review_count   
      FROM business 
      WHERE name LIKE '%${name}%'
      ORDER BY stars, review_count DESC LIMIT 10
    `;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };


/* ---- Query 4, Select the restaurants (business name) in that received the most tips given by the users ---- */
const cityMostTip = (req, res) => {
//用了
    console.log('Restaurants with most tips in city:');
    //var city = req.params.city
    const query = `
    With temp AS (
        SELECT business_id, COUNT(*) AS number
        FROM tip_legit
        GROUP BY business_id
        ORDER BY number desc)
        
        SELECT name, b.city AS city, b.state AS state
        FROM business b join temp t
        ON b.business_id = t.business_id
        LIMIT 5000
      
    `;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Query 5, Select the business name in a specific city that has the maximum amount of funny reviews ---- */
//用了
const cityMostReview = (req, res) => {
    console.log('Top 20 restaurants with most reviews:');
    //var city = req.params.city
    const query = `
    SELECT name, SUM(funny) AS funny_review
    FROM review_funny
    GROUP BY business_id
    ORDER BY funny_review desc
    limit 100; 
    `;
   
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Query 6, Find information of restaurants with scores that are above average in a region.  ---- */
 //没用
const scoreAboveRegion = (req, res) => {
  console.log('Restaurants with scores above average in region:');
  var state = req.params.state
  var city = req.params.city
  const query = `
    WITH temp AS(
    SELECT AVG(stars) AS avg
    FROM business 
    WHERE state = '${state}' AND city = '${city}'
    )
    SELECT business_id, name, address, city, state, postal_code, stars, review_count, avg FROM temp, business
    WHERE state = '${state}' AND city = '${city}' AND stars > avg
    ORDER BY stars, review_count DESC LIMIT 20
    `;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
};

  

/* ---- Query 7, Find information about high-rated businesses that are among the top-rated businesses, which are also recommended by influencer users, ie. those who have many fans.  ---- */
//用了
const highScoreFans = (req, res) => {
    console.log('High-rated businesses with many fans:');
    const query =`
    with restaurant as(
      select user_id, stars, text, t.business_id, name
      from reviews_legit inner join temp7 t
      where stars > 3
      limit 10000)
      
      SELECT distinct business_id, r.name AS name, r.user_id, stars, fans
      FROM  restaurant r inner JOIN user_noFriends u on r.user_id = u.user_id
      WHERE stars > average_stars
      ORDER BY fans DESC
      limit 50;
      `
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Query 8, Find restaurant information currently open and has most recent reviews  ---- */
//准备用
const openReview = (req, res) => {
    console.log('Open restaurant with most recent reviews and tips:');
    
    //var city = req.params.city
    var city = req.params.city ? req.params.city: 'Boston'
    const currentDate = new Date()
    var date = currentDate.toLocaleString('en-US', { weekday: 'long' })
    var date_open = 'hours.' + date + '_open'
    var date_close = 'hours.' + date + '_close'
    
    const query = `
    With Temp as (
      SELECT business_id, name, stars, review_count, city, state
      FROM business
      WHERE city = '${city}'
      AND TIME(date_sub(now(),interval 5 hour)) >= TIME(\`${date_open}\`)
      AND TIME(date_sub(now(),interval 5 hour)) < TIME(\`${date_close}\`)
      AND stars > 3
      order by review_count desc
      LIMIT 100
  )
  
  select distinct name, stars, review_count, city, state
  from (select *
    from (SELECT name, t.stars, review_count, city, state, r.date as date
       FROM Temp t inner JOIN reviews_legit r on t.business_id = r.business_id
       where r.date > 2016
       limit 200) a
      group by name, a.date
       order by a.date desc
      ) output;`

    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Query 9, Find restaurant information currently open and has most recent tips  ---- */
//准备用
const openTip = (req, res) => {
  console.log('Open restaurant with most recent reviews and tips:');
  var city = req.params.city ? req.params.city: 'Boston'
  const currentDate = new Date()
  var date = currentDate.toLocaleString('en-US', { weekday: 'long' })
  var date_open = 'hours.' + date + '_open'
  var date_close = 'hours.' + date + '_close'

  
  const query = `
    With Temp as (
      SELECT business_id, name, stars, review_count, city, state
      FROM business
      WHERE city = '${city}'
      AND TIME(date_sub(now(),interval 5 hour)) >= TIME(\`${date_open}\`)
      AND TIME(date_sub(now(),interval 5 hour)) < TIME(\`${date_close}\`)
      AND stars > 3
      order by stars desc
      LIMIT 100
  )
  
  select distinct name, stars, review_count, city, state
  from (select *
    from (SELECT name, t.stars, review_count, city, state, r.date as date
       FROM Temp t inner JOIN tip_legit r on t.business_id = r.business_id
       where r.date > 2016
       order by date desc
       limit 500) a
      group by name, a.date
      ) output;`

  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

/* ---- Query 10, Find the top 50 restaurants category of the 10 most active Yelp users visit most frequently reviewed (reviewed multiple times)  ---- */
//用了
const categoryActiveUser = (req, res) => {
    console.log('Restaurant category loved by active Yelp users:');
    const query =  `With Temp as(
      SELECT business_id
      FROM review_ids r join user_reviewCount u on r.user_id = u.user_id
      )
  
    SELECT categories, count(*) as visitnumber
    FROM business b join Temp t on b.business_id = t.business_id
    GROUP BY categories
    ORDER BY visitnumber desc
    limit 50`;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Create temp table for query 11 and 13 ---- */
const createReviewIdTable = (req, res) => {
  console.log('Create table for Query 11 and 13:');
  
  const query = `
  INSERT INTO review_ids
  SELECT distinct business_id, user_id
  FROM reviews_legit;
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json("Table Created");
    }
    ;
  });
};

/* ---- Query 11, Find the restaurants that both user ABC’s friend and user ABC tipped on.  ---- */
//not used since not many users have friends here
//没用，因为user没啥朋友
const userFriend = (req, res) => {
    console.log('Restaurants loved by User and Friends:');
    var user = req.params.user
    const query =`
    With temp as (
      SELECT distinct business_id
      FROM review_ids
      WHERE user_id = '${user}'
    )
    SELECT distinct name, city, user_id
      FROM review_ids tl join temp t using(business_id) join business b using(business_id)
      where user_id in (SELECT friends
        from friends_legit
        where user_id = '${user}'
        );
      `;
  //   const query = `
  //   With temp as (
  //     SELECT distinct t.business_id
  //     FROM tip_legit t
  //     WHERE t.user_id = '${user}'
  // )
  // SELECT distinct t.business_id, user_id
  //     FROM tip_legit tl join temp t on tl.business_id = t.business_id
  //     where user_id = (SELECT friends
  //     from friends_legit
  //     where user_id = '${user}'
  //     );
  //   `;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else {
          console.log(rows);
          res.json(rows);
      }
      ;
    });
  };

/* ---- Query 12, Find restaurant information with reviews, visited by influencers   ---- */
// not used, we don't need the info of influncers on our webpage
//没用
const visitInfluencer = (req, res) => {
  console.log('Restaurants visited by influencers:');
  const query = `
  SELECT influncer.user_id, influncer.useful, fans, reviews_legit.business_id, reviews_legit.text FROM
(SELECT user_id, useful, fans FROM user_noFriends WHERE fans > 1500) AS influncer
JOIN reviews_legit ON influncer.user_id = reviews_legit.user_id
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

/* ---- Query 13, Find the city of restaurants that user ABC’s friend tipped on.  ---- */
//准备用
const userFriendTip = (req, res) => {
  console.log('City of restaurants that user’s friend tipped on:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT distinct b.name ,b.city, b.state, b.stars, b.review_count
  FROM business b join review_ids t on b.business_id = t.business_id
  WHERE t.user_id in (SELECT friends
  from friends_legit
  where user_id = '${user}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

/* ---- Query 14s, Find business by specific category  ---- */
//14的一串都用了
const findFastFood = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name,  stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%fast food%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findSeafood = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name, stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%seafood%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findSalad = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name, stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%salad%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findJapan = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name,  stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%japanese%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findChinese = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name, stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%chinese%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findAmerica = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name, stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%america%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findMexica = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name,stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%mexica%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findBars = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  var user = req.params.user
  const query = `
  SELECT business_id, name, stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   FROM business 
  WHERE categories LIKE '%bars%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findBreakfast = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw
  const query = `
  SELECT business_id, name, stars, 
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating,
  review_count FROM business 
  WHERE categories LIKE '%breakfast%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

const findCafe = (req, res) => {
  console.log('Find business by specific category:');
  //Test using user = FGperykVyoM81lDpGev1Dw

  const query = `
  SELECT business_id, name, stars, 
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating,
  review_count FROM business 
  WHERE categories LIKE '%cafe%'
  ORDER BY stars DESC LIMIT 300
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

/* ---- Query 15 Final All Business ---- */
//用了
const searchAll = (req, res) => {
  console.log('Final All Business');
  const query = `
  SELECT business_id, name, categories, city, state, stars, review_count,
  \`attributes.BikeParking \` AS bikeParking,
  \`attributes.BusinessAcceptsCreditCards\` AS creditCard,
  \`attributes.RestaurantsReservations\` AS reservation,
  \`attributes.OutdoorSeating\` AS outdoorSeating   
  FROM business ORDER BY stars DESC, review_count DESC LIMIT 5000
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

module.exports = {
    hello,
    searchByLocation:searchByLocation,
    searchByName:searchByName,
    // searchBySpecific:searchBySpecific,
    cityMostTip:cityMostTip,
    cityMostReview:cityMostReview,
    scoreAboveRegion:scoreAboveRegion,
    highScoreFans:highScoreFans,
    openReview:openReview,
    openTip:openTip,
    categoryActiveUser:categoryActiveUser,
    userFriend:userFriend,
    visitInfluencer:visitInfluencer,
    userFriendTip:userFriendTip,

    findJapan:findJapan,
    findChinese:findChinese,
    findMexica:findMexica,
    findAmerica:findAmerica,
    findSalad:findSalad,
    findFastFood:findFastFood,
    findSeafood:findSeafood,
    findBars:findBars,
    findBreakfast:findBreakfast,
    findCafe:findCafe,
    searchAll:searchAll
}