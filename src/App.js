import React, {useState, useEffect} from "react"

const whatIsInsideLocalStorage = () => {
    if (localStorage.getItem("list")) {
        return localStorage.getItem("list").split(",")
    }
    return []
}

function App() {
    const [input,
        setInput] = useState("");
    const [items,
        setItems] = useState(whatIsInsideLocalStorage);
    const [edit,
        setEdit] = useState(false)
    const [indexx,
        setIndexx] = useState(0)
    const [msg,
        setMsg] = useState([])

    const handleClick = e => {
        e.preventDefault();

        if (edit) {
            if (input) {
                let newItems = [
                    ...items.slice(0, indexx),
                    input,
                    ...items.slice(+ indexx + 1)
                ];
    
                setItems(newItems)
                setMsg(["Value changed", 'green'])
            } else {
                setMsg(["Value unchanged", 'orange'])
            }
                setInput("")
                setEdit(false)
        } else {
            if (input) {
                setItems([
                    ...items,
                    input
                ])
                setInput("")
                setMsg(["Item added to the list", "green"])
            } else {
                setMsg(["Please enter value", "red"])
                console.log("empty inputs")
            }
        }

    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            setMsg("")
        }, 2000)
        return () => clearTimeout(timeout)
    })

    const deleteItem = (index) => {
        let newItems = items.filter((item, i) => i !== index);
        setItems(newItems)
        //setInput("")  // to empty input after deleting an item
        setEdit(false)
        setMsg(["Item removed", "red"])
    }

    const editItem = (index) => {
        setEdit(true)
        setIndexx(index)
        let newInput = items[index];
        setInput(newInput)
    }

    const clearAll = () => {
        setItems([]);
        setMsg(["Empty list", "red"]);
        //setInput("")  // to empty input after deleting an item
    }

    useEffect(() => {
        localStorage.setItem("list", items.toString())
    }, [items])
    return (
        <main>
            <p
                className="status"
                style={{
                color: msg[1],
                border: msg
                    ? `2px solid ${msg[1]}`
                    : 'none'
            }}>{msg[0]}</p>
            <h3 className="title">Grocery list</h3>
            <form>
                <input
                    id="input"
                    name="input"
                    type="text"
                    placeholder="e.g. eggs"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className={`${edit && "editing"}`}></input>
                <button type="submit" onClick={handleClick}>{edit
                        ? "Edit"
                        : "Sumbit"}</button>
            </form>
            {items.map((item, index) => {
                return (
                    <div className="item-container" key={index}>
                        <p className="item">{item}</p>
                        <button className="edit-btn" onClick={() => editItem(index)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="delete-btn" onClick={() => deleteItem(index)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                )
            })}
            <button type="button" className="clear-btn" onClick={clearAll}>clear all</button>
        </main>
    );
}

export default App;