export function validator(form) {
    const errors = {}

    if(!form.title) {
        errors.title = "The title is empty"
    } else if (!validateTitle(form.title)) {
        errors.title = "The title only acepts letters"
    } else if (form.title.length > 30) {
        errors.title = "The title can only have up to 30 characters."
    }

    if (!validateImage(form.image)) {
        errors.image = "The image must be a valid URL. (e.g.: https://YourImageURL.com)"
    }

    if (!validateHealthScore(form.healthScore)) {
        errors.healthScore = "The healthScore only accepts numbers from 0 to 100."
    }

    if(!form.summary) {
        errors.summary = "The summary is empty"
    }

    if(form.steps.length === 0) {
        errors.steps = "The steps are empty"
    }

    if(form.diets.length === 0) {
        errors.diets = "The diets are empty"
    } else if (!validateDiets(form.diets)) {
        errors.diets = "Some diets are invalid!"
    }
    return errors
}

const validateTitle = (title) => {
    const titleValidator = /^[A-Za-z]+$/
    return titleValidator.test(title)
}
const validateImage = (image) => {
    const imageValidator = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/
    return imageValidator.test(image)
}
const validateHealthScore = (healthScore) => {
    const healthScoreValidator = /^(?:100|[1-9]?\d)$/
    return healthScoreValidator.test(healthScore)
}
const validateDiets = (diets) => {
    const dietsValidator = /^[a-zA-Z0-9]{1,30}$/
    let result = diets.map(diet => dietsValidator.test(diet))
    return result
}