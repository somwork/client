import React from 'react'
import Layout from '../../components/Layout'

export default () => (

  <Layout>
      <h2>Edit Task</h2>
      <label>
         Title    
         <input type="text"></input>
      </label>
      <label>
         Start Date 
         <input type="date"></input>
      </label>
      <label>
         Deadline
        <input type="date"></input>
      </label>
      <label>
         Description    
         <textarea></textarea>
     </label>
     <label>
         Urgency    
         <input type="text"></input>
     </label>
     <input type="submit" value="Save Changes"/>        
</Layout>
)
