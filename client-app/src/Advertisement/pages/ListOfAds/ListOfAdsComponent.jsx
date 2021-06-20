import React from "react"
import Ad from "../../components/Ad/Ad";

function ListOfAdsComponent(props) {
  const RenderAds = () => {
     
      return (
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            {props.state.Ads.filter(ad => ad.name.toLowerCase().includes(props.state.title.toLowerCase())).map((item, index) => (
              <Ad key={index} dataParent={item} load={props.load}/>
            ))}
          </div>
        </div>

      )
    
  }

  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <label className=" mr-2">Search by title </label>
        <input type="text" name="title"
          className="col-md-6 rounded ml-1 mr-2"
          value={props.state.title}
          onChange={(e) => props.HandleValueChange(e)}>
        </input>
        <label className="ml-5 mr-2">Sort by </label>
        <select className="col-md-3 rounded ml-1" onChange={(e) => props.onSort(e)}>
          <option value="Select parametr for sort" defaultValue >Select parametr for sort </option>
          <option value="Name">Name</option>
          <option value="Price">Price</option>
          <option value="Date">Date</option>
        </select>
        <p className="col-md-3">{props.state.Ads.filter(ad => ad.name.toLowerCase().includes(props.state.title.toLowerCase())).length} searched results</p>
      </div>

      <div className="col-md-3"></div>
      {RenderAds()}
    </div>
  );
}

export default ListOfAdsComponent