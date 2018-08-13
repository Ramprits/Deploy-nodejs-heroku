var express = require("express");
var router = express.Router();
const mongo = require("mongodb");
const assert = require("assert");
const url = "mongodb://localhost:27017/Adventure";

const Employee = require("../models/employee");
/* GET home page. */
router.get("/", function(req, res, next) {
  let news = [
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: null,
      title: "Tlaib: We had border security before ICE - CNN Video",
      description:
        "Michigan Democrat Rashida Tlaib is poised to become the first Muslim woman ever elected to Congress. She tells CNN's Poppy Harlow why she has joined the movement to abolish the Immigrations and Customs Enforcement agency.",
      url:
        "http://us.cnn.com/videos/politics/2018/08/13/rashida-tlaib-candidate-michigan-abolish-ice-bts-nr-vpx.cnn",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180813101311-rashida-tlaib-newsroom-08132018-super-tease.jpg",
      publishedAt: "2018-08-13T14:37:32.9329064Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Jackie Wattles, CNN",
      title: "Trump encourages boycott against Harley-Davidson",
      description:
        'President Donald Trump said it\'s "great" that consumers might boycott Harley-Davidson if it moves some motorcycle production overseas.',
      url:
        "http://us.cnn.com/2018/08/12/politics/trump-harley-davidson-overseas-manufacturing/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180803134250-trump-harley-1-super-tease.jpg",
      publishedAt: "2018-08-13T12:08:17.541596Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Madison Park and Artemis Moshtaghian, CNN",
      title:
        "Florida candidate's diploma photo doesn't appear to be accurate, university says",
      description:
        "A Florida state house candidate's college degree has been called into question -- by the very university that she claimed to have graduated from.",
      url:
        "http://us.cnn.com/2018/08/12/politics/melissa-howard-miami-university/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180812201713-melissa-howard-super-tease.jpg",
      publishedAt: "2018-08-13T12:08:11.4107168Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Elizabeth Cohen and John Bonifield, CNN Health",
      title: "Escape from the Mayo Clinic: How CNN reported the story",
      description:
        "Alyssa Gilderhus' family begged for her to be sent to the Mayo Clinic. They never thought they'd have to help her escape a few months later.",
      url:
        "http://us.cnn.com/2018/08/13/health/mayo-clinic-escape-3-eprise/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180808132719-11-new-escape-from-mayo-super-tease.jpg",
      publishedAt: "2018-08-13T12:08:07.0445263Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: null,
      title: "Alyssa Gilderhus' video for her mom - CNN Video",
      description:
        "During Alyssa Gilderhus's hospitalization at the Mayo Clinic, she and her aunt, April Chance, made this video for her mom.",
      url:
        "http://us.cnn.com/videos/health/2018/08/10/escape-from-mayo-clinic-video-for-mom.courtesy-amber-engebretson",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180810120023-escape-from-mayo-clinic-video-for-mom-00000308-super-tease.jpg",
      publishedAt: "2018-08-13T12:08:02.9215725Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Elizabeth Cohen and John Bonifield, CNN Health",
      title:
        "Teen escapes from the Mayo Clinic after hospital won't let her go",
      description:
        "Alyssa Gilderhus' family begged for her to be sent to the Mayo Clinic. They never thought they'd have to help her escape a few months later.",
      url:
        "http://us.cnn.com/2018/08/13/health/mayo-clinic-escape-2-eprise/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180808132719-11-new-escape-from-mayo-super-tease.jpg",
      publishedAt: "2018-08-13T11:23:04.4838202Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: null,
      title: "Watch teen escape from Mayo Clinic  - CNN Video",
      description:
        'Alyssa Gilderhus accuses the Mayo Clinic of trying to "medically kidnap" her. Watch her escape.',
      url:
        "http://us.cnn.com/videos/health/2018/07/16/escape-from-mayo-clinic-nccorig.cnn",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180808132719-11-new-escape-from-mayo-super-tease.jpg",
      publishedAt: "2018-08-13T11:23:02.5150757Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Elizabeth Cohen and John Bonifield, CNN Health",
      title: "Teen accuses world-famous Mayo Clinic of 'medical kidnapping'",
      description:
        'A dying teenager\'s parents begged for her to be sent to the Mayo Clinic. The family says the world-renowned hospital saved her life and then tried to "medically kidnap" her.',
      url:
        "http://us.cnn.com/2018/08/13/health/mayo-clinic-escape-1-eprise/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180808132719-11-new-escape-from-mayo-super-tease.jpg",
      publishedAt: "2018-08-13T11:22:48.1387134Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Jessie Yeung, CNN",
      title: "Taipei hospice fire leaves 9 dead, 15 injured",
      description:
        "Fire ripped through a hospital in Taiwan Monday, killing at least nine people and injuring more than dozen, authorities said.",
      url:
        "http://us.cnn.com/2018/08/13/asia/taipei-hospital-fire-intl/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/180813145900-03-taiwan-hospital-fire-super-tease.jpg",
      publishedAt: "2018-08-13T10:45:11.5570494Z"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Maurie Backman for the Motley Fool",
      title: "4 things you can do to be recession-ready",
      description:
        "Are you prepared for another downturn? Here's how to get your financial house in order.",
      url: "https://money.cnn.com/2018/08/13/pf/recession-ready/index.html",
      urlToImage:
        "https://i2.cdn.turner.com/money/dam/assets/160201125241-dragging-into-recession-780x439.jpg",
      publishedAt: "2018-08-13T10:08:14Z"
    }
  ];
  res.json(news);
});

router.post("/", function(req, res, next) {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  employee
    .save()
    .then(data => {
      res.status(201).json({
        message: "Created sucessfully"
      });
    })
    .catch(error => {
      console.error("Unable to save employee >", error);
    });
});

module.exports = router;
