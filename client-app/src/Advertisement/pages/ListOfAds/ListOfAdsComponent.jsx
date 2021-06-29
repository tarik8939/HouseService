import React from "react"
import Ad from "../../components/Ad/Ad";

function ListOfAdsComponent(props) {
  const RenderAds = () => {

    return (
      <div>
          {props.state.Ads.filter(ad => ad.name.toLowerCase().includes(props.state.title.toLowerCase())).map((item) => (
            <Ad key={item.advertisementID} dataParent={item} load={props.load} />
          ))}
      </div>
    )
  }

  return (
    <div>
    <div className="row mb-3">
        <p className="col-auto fs-4 text-right">Find</p>
        <input type="search" name="title"
          className="col-10  col-lg-11"
          value={props.state.title}
          onChange={(e) => props.HandleValueChange(e)}>
        </input>
    </div>
    <div className="row mb-3">
        <p className="col-auto fs-4 text-right">Sort</p>
        <select className="col-10  col-lg-11" onChange={(e) => props.onSort(e)}>
          <option value="Select parametr for sort" defaultValue >Select parametr for sort </option>
          <option value="Name">Name</option>
          <option value="Price">Price</option>
          <option value="Date">Date</option>
        </select>
    </div>
    <div className="row mb-3">
        <p className="col-auto fs-4 text-right">{props.state.Ads.filter(ad => ad.name.toLowerCase().includes(props.state.title.toLowerCase())).length} searched results:</p>
    </div>
    <div>{RenderAds()}</div>
    </div>
  );
}

export default ListOfAdsComponent