import React from 'react'
import Layout from '../../components/Layout'

export default ({ children }) => (

  <Layout>
      <h2>Edit Task</h2>
      <label>
      Tittle    
         <input type="text"></input>
         </label>

        <label>
            Task start date 
        <input type="date"></input>
        </label>

        <label>
            Task Deadline
        <input type="date"></input>
        </label>

         <label>
         Description    
         <input type="text"></input>
         </label>

         <label>
         Urgency    
         <input type="text"></input>
         </label>

         <input type="submit" value="Save Changes"/>

         

    
        
</Layout>
)
