import { useState } from "react";
import useFetchData from "./useFetchData";
import { nanoid } from 'nanoid';
import SubmitOrder from "./SubmitOrder";

const ShowData = () => {
    const url="http://localhost:3001/food";
    const settings = {
      method: "GET"
    };

    const { status, data } = useFetchData({url,settings});
    const foods = data;
    const [selectedItems, setSelectedItems] = useState([]);

    let availableItems = foods.filter(food => food.available === "yes");

    const handleClickSelect = (e, info) => {
        let newState = [...selectedItems, info];
        setSelectedItems(newState);
    };
    const handleClickDeselect = (e, item) => {
        let updatedItems = selectedItems.filter((element) => {
            return element !== item;
        });
        setSelectedItems(updatedItems);
    };

    if (status === 'fetched')
        return (
            <div>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                                {availableItems.map((details) => (
                                    <div style={{ cursor: 'pointer' }}
                                        className="card"
                                        key={details.id}
                                        onClick={(e) => handleClickSelect(e, details.name)}>
                                        <div className="ratio ratio-1x1 rounded-circle overflow-hidden">
                                            <img src={details.url} className="card-img-top img-cover" alt="food" />
                                        </div>
                                        <div className="card-body">
                                            <p>{details.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col">
                                    {selectedItems.map((selected) => (
                                        <li style={{ cursor: 'pointer' }}
                                            className="list-group-item"
                                            key={nanoid()}
                                            onClick={(e) => handleClickDeselect(e, selected)}>
                                            {selected}
                                        </li>
                                    ))}
                                </div>
                                <div className="col-8" ><SubmitOrder selectedItems={selectedItems} onSendOrder={setSelectedItems} /> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    return <p>There is currently an issue displaying the food menu</p>
};

export default ShowData;



