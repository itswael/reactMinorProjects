import {useActionState, use} from 'react'
import { useFormStatus } from 'react-dom'
import {OpinionsContext} from "../store/opinions-context.jsx";

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext)
  async function shareOpinionAction(prevFormState, formData){
    const title = formData.title;
    const body = formData.body;
    const userName = formData.userName;

    let errors = []

    if (title.trim().length < 5){
      errors.push('Title must be at least 5 characters.');
    }

    if (body.length < 10 || body.trim().length >300){
      errors.push('Body must be at least 10 characters.');
    }

    if  (!userName.trim()){
      errors.push('Username must be provided.');
    }

    if (errors.length > 0){
      return {
        errors,
        enteredValues:{
          title,
          body,
          userName,
        }}
    }

    await addOpinion({title, body, userName})
    return {errors: null}

  }

  const [formState, formAction] = useActionState(shareOpinionAction, {errors: null});
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={shareOpinionAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.username}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && <ul className={"errors"}>
          {formState.errors.map(error => (
              <li key={error}>{error}</li>
          ))}
        </ul>}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
