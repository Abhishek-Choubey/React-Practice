import axios from "axios";
import { useEffect, useState } from "react";

export function Form() {
    const [formdata, setFormdata] = useState({
        game: "",
        author: "",
        tags: "",
        price: "",
        kids: "",
        desc: "",
        rating: "",
    });
    useEffect(()=>[
        getData()
    ],[])
    const [datas, setDatas] = useState([])

    function handleChange(e) {
        const { id, value } = e.target;
        setFormdata({ ...formdata, [id]: value });
    }
    function getData() {
        axios.get("http://localhost:3001/games").then((res) => [
            setDatas(res.data)
        ])
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:3001/games", formdata).then(() => {
            alert("User Registered!")
            getData();
            setFormdata(
                {
                    game: "",
                    author: "",
                    tags: "",
                    price: "",
                    kids: "",
                    desc: "",
                    rating: "",
                }
            )
        })


    }
    return <>
        <h1>Games Store</h1>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" id="game" placeholder="Enter Game Name" /><br />
            <input onChange={handleChange} type="text" id="author" placeholder="Enter Author" /><br />
            <input onChange={handleChange} type="text" id="tags" placeholder="Enter Tags" /><br />
            <input onChange={handleChange} type="number" id="price" placeholder="Enter Price" /><br />
            <label htmlFor="">Kids</label>
            <input onChange={handleChange} id="kids" type="checkbox" placeholder="child" /><br />
            <textarea onChange={handleChange} value="DEFAULT" id="desc" cols="20" rows="3">Enter text here...</textarea><br />
            <label htmlFor="Ratings">Ratings</label>
            <select onChange={handleChange}  name="Ratings" id="rating">
                <option value="DEFAULT" disabled></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br /><br />
            <button type="submit" >Submit</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Author</th>
                    <th>Tags</th>
                    <th>Price</th>
                    <th>Kids</th>
                    <th>Description</th>
                    <th>Ratings</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((elem) => 
                    <tr key={elem.id}>
                        <td>{elem.game}</td>
                        <td>{elem.author}</td>
                        <td>{elem.tags}</td>
                        <td>{elem.price}</td>
                        <td>{elem.kids}</td>
                        <td>{elem.desc}</td>
                        <td>{elem.rating}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}