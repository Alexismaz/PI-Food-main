import React, { useEffect, useState } from 'react'
import './Form.css'
import {validator} from './validator'
import { useDispatch } from 'react-redux'
import { addRecipe } from '../../redux/Actions'
import imagePreview from '../../assets/images/imageDefaultRecipes.jpg'

export default function Form() {
    const dispatch = useDispatch()
    const [numStep, setNumStep] = useState(1)
    const [stepText, setStepText] = useState("")
    
    const [form, setForm] = useState({
        title: "",
        image: "",
        healthScore: 0,
        summary: "",
        diets: [],
        steps: [],
    })
    const handleDelete = (diet) => {
        console.log(form.diets)
        setForm({...form,
            diets: form.diets.filter(diet2 => diet2 !== diet) })
    }
    const orderedSteps = form.steps && form.steps.length > 0 ? form.steps.map((step) => <li key={step.paso}>{step.instruccion}</li>) : null
    const orderedDiets = form.diets && form.diets.map((diet, index) => <li key={index} className='dietPreview' onClick={() => handleDelete(diet)}>{diet}</li>)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const error = validator(form)
        setErrors(error)
    }, [form])

    const handleChange = (event) => {
        setForm({...form,
            [event.target.name]: event.target.value})
    }

    const handleChangeStep = (event) => {
        let { value } = event.target
        setStepText(value);
    };
    const handleAddStep = () => {
        setForm((prevForm) => ({
            ...prevForm,
            steps: [
            ...prevForm.steps,
                {
                paso: numStep,
                instruccion: stepText,
                },
            ],
        }));
        setNumStep(numStep + 1)
        setStepText("")
    }

    const handleChangeDiets = (event) => {
        const {value} = event.target
        if(!form.diets.includes(value)) {
            setForm({...form,
                diets: [...form.diets, value]})
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(Object.keys(errors).length === 0) {
            if(form.image.trim() === "") {
                const {image, ...formNoImage} = form
                dispatch(addRecipe(formNoImage))
            } else {
                dispatch(addRecipe(form))
            }
            setNumStep(1)
            setForm({
                title: "",
                image: "",
                healthScore: 0,
                summary: "",
                steps: [],
                diets: [],
            })
            alert('Recipe Created!')
        } else {
            alert("No se puede crear cuando hay errores, vuelva a internarlo")
        }
    }
  return (
    <div className='divGeneral'>
        <form onSubmit={handleSubmit} className='Form'>
        <h2 className='h2Form'>Create your recipe</h2>
        <label className='labelForm'>Name of recipe</label>
        <input className='inputForm' type="text" name='title' key="title" onChange={handleChange} value={form.title} placeholder='Name of the recipe'/>
        <label className='errorForm'>{errors?.title && errors.title}</label>
        <label className='labelForm'>Image of recipe</label>
        <input className='inputForm' type="text" name='image' key="image" onChange={handleChange} value={form.image} placeholder='Put the image of your recipe'/>
        <label className='errorForm'>{errors?.image && errors.image}</label>
        <label className='labelForm'>Summary of recipe</label>
        <input type='text' className='inputForm' name='summary' key="summary" onChange={handleChange} value={form.summary} placeholder='The summary of recipe here'/>
        <label className='errorForm'>{errors?.summary && errors.summary}</label>
        <label className='labelForm'>HealthScore of recipe</label>
        <input className='inputForm' type="number" name='healthScore' key="healthScore" onChange={handleChange} value={form.healthScore} placeholder='HealthScore here'/>
        <label className='errorForm'>{errors?.healthScore && errors.healthScore}</label>
        <label className='labelForm'>Step {numStep}</label>
        <input className='inputForm' type='text' name='informacion' key="step" onChange={handleChangeStep} value={stepText} placeholder={`Instruccion of step${numStep}`}/>
        <label className='errorForm'>{errors?.steps && errors.steps}</label>
        <button className='addStepButton' type="button" onClick={handleAddStep}>Add Step</button>
        <label className='labelForm'>Diets of recipe</label>
        <select className='selectForm' onChange={handleChangeDiets}>
        <option >Select diets</option>
        <option value="gluten free">Gluten Free</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="primal">Primal</option>
        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="paleolithic">Paleo</option>
        <option value="dairy free">Dairy Free</option>
        <option value="whole 30">Whole 30</option>
        <option value="fodmap friendly">Low FODMAP</option>
        </select>
        <label className='errorForm'>{errors?.diets && errors.diets}</label>
        <button className='submitButton' type='submit'>Create recipe</button>
        </form>
        <div className='formPreview'>
            <h2>Recipe preview</h2>
            <h3 className='h3Preview'>Title</h3>
            <label >{form.title}</label>
            <h3 className='h3Preview'>Image</h3>
            {form.image === "" ? <img className='imagePreview' src={imagePreview} alt="imagePreview" /> : <img className='imagePreview' src={form.image} alt="imagePreview" />}
            <h3 className='h3Preview'>HealthScore</h3>
            <label >{form.healthScore}</label>
            <h3 className='h3Preview'>Summary</h3>
            <pre className='prePreview'>{form.summary}</pre>
            <h3 className='h3Preview'>Diets</h3>
            <ul className='dietList'>{orderedDiets}</ul>
            <h3 className='h3Preview'>Steps</h3>
            <ol>{orderedSteps}</ol>
        </div>
    </div>
  )
}
