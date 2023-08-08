import react, {useState} from 'react';

const Form = ({handleSubmitButtonClick, id}) => {

  console.log('edit form got the id', id)
  return (
    <>
    <form className = "form" onSubmit={(event)=>{handleSubmitButtonClick(event, id)}}>
      <h3>  NEW  </h3>
        Item <input name="item" placeholder = "Leather Jacket" required /> <br></br>
        Category <input name="category" placeholder = "Outerwear" required /> <br></br>
        Color <input name="color" placeholder = "Black" required /> <br></br>
        Brand <input name="brand" placeholder = "YSL" required /> <br></br>
        Occasion <input name="occasion" placeholder = "Casual" required /> <br></br>
        Tags <input name="tags" placeholder = "leather moto" required /> <br></br>
        Photos <input type="file" name = "photos" accept=".jpg, .jpeg, .png" multiple /> <br></br>
      <button type="submit">ADD</button>
    </form>

    </>
  )
}

export default Form;