import React from 'react'
import Layout from '../../components/Layout'

export default () => (
  <Layout>
      <h2>Edit Task</h2>
      <label>
         Title    
         <input type="text" />
      </label>
      <label>
         Start Date 
         <input type="date" />
      </label>
      <label>
         Deadline
        <input type="date"/>
      </label>
      <label>
         Description    
         <textarea/>
     </label>
     <label>
         Urgency    
         <input type="text"/>
     </label>
     <input type="submit" value="Save Changes"/>        
	</Layout>
)
