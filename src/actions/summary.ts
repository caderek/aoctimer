import views from "../views"
import config from "../config"

const summary = () => {
  console.log(views.summary(config.year, config.days))
}

export default summary
