import React,{Component} from "react";
import Layout from '../../components/Layout';
import Offer from '../../api/offer';

export default class View extends Component{

  constructor(props){
    super(props);

    this.state = {Offers:[]}

   this.loadOffer();
  };

  /**
   *loads all tasks from the db into the state
   */
  loadOffer = async list=>{
   const res = await Offer.get(this.props.match.params.id);
   this.setState({tasks:res})
  }

  /**
   * render a Offer
   * @param {int} id
   * @param {Boolean} accepted
   * @param {Decimal} price
   * @param {String} Currency
   * @param {int} WorkerId
   * @param {int} TaskId
   * @return {JSX} a task as a list item
   */
 fieldRender(offer){
  return(
    <Layout>
      <li key ={offer.id}>
        <label>
          <p><b>Offer Id:</b> {Offer.id}</p>
          <p> WorkerId: {offer.WorkerId} </p>
          <p><b>Price: </b>{offer.price} - {offer.Currency}</p>
        </label>
      </li>
    </Layout>
  )
}

  /**
   * Creates the Task overview view
   * @return {JSX} View
   */
  render(){
    return (
      <Layout>
        <section>
          <h1>Offer</h1>
          <ul>
            {this.fieldRender(this.state.tasks)}
          </ul>
          <button>Accept</button>
          <button>Back</button>
        </section>
      </Layout>
    )
  }
}
