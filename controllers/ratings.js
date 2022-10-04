import { Rating } from '../models/rating.js'

Rating.create({score: "" , owner: ""}, function(err, ratingController) {
  console.log(ratingController)
})