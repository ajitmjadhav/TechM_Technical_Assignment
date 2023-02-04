import React, { useState, useRef } from 'react'
import headerImage from '../img/headerImage.jpg'
import app from '../firebase/connection'
import { getDatabase, ref, set, onValue } from 'firebase/database'

//react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//instance
const db = getDatabase(app);

const List = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [savedItems, setSavedItems] = useState([]);

    //create boolean flag for toggling the submit
    const [isSubmit, setIsSubmit] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    //to adjust focus on input
    const inputRef = useRef(null);
    const createCurretDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        // let time = today.getTime();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = `${dd} / ${mm} / ${yyyy}`;
        return formattedToday;
    }
    // add the Item to the list
    const addItem = () => {
        if (!inputData) {
            // alert('insert text')
            toast.error('Please insert text');
        }
        //if item editing is active
        else if (inputData && !isSubmit) {
            //get ele and edit its name
            // const tempItem = items.map((ele) => {
            //     if (ele.id === isEditing) {
            //         return { ...ele, name: inputData, date: createCurretDate() }
            //     }
            //     return ele;
            // });
            console.log('0st if');
            const tempItem = items.find(ele => isEditing === ele.id);
            if (!tempItem) {
                const tempItem1 = savedItems.map((ele) => {
                    if (ele.id === isEditing) {
                        return { ...ele, name: inputData, date: createCurretDate() }
                    }
                    return ele;
                });

                setSavedItems(tempItem1);
                console.log('1st if');
            }
            else {
                const tempItem2 = items.map((ele) => {
                    if (ele.id === isEditing) {
                        return { ...ele, name: inputData, date: createCurretDate() }
                    }
                    return ele;
                });
                setItems(tempItem2);
                console.log('2st else');
            }


            setIsSubmit(true);
            setInputData(``);
            setIsEditing(false);
            // alert('item edited');
            toast.success('Item Edit successful');
        }
        else if (inputData) {
            const dataToAdd = {
                id: new Date().getTime().toString(),
                name: inputData,
                date: createCurretDate(),
            };
            setItems([...items, dataToAdd]);
            setInputData('');
            // console.log(items);
            // alert('item added')
            toast.success('Item Added successful');
        }
        else {
            // alert('insert text')
            toast.error('Please insert text');
        }
    };
    // delete the items
    const deleteCurrentItem = (index) => {
        const itemToDelete = items.filter((elem) => {
            return index !== elem.id;
        });
        if (itemToDelete.length === items.length) {
            const deleteOne = savedItems.filter((elem) => {
                return index !== elem.id;
            });
            setSavedItems(deleteOne)
        }
        else {
            setItems(itemToDelete);
        }
        setInputData('');
        setIsSubmit(true);
        // alert(`Item deleted with id ${index}`);
        toast.success('Item delete successfully');
    }

    //edit the current item
    const editCurrentItem = (id) => {
        let newEditItem = items.find((e) => {
            return e.id === id
        });
        if (!newEditItem) {
            const findOne = savedItems.find((elem) => {
                return id === elem.id;
            });
            setInputData(findOne.name);
        }
        else {
            setInputData(newEditItem.name);
        }

        // setInputData(newEditItem.name);
        setIsSubmit(false);
        //passing current id to state variable
        setIsEditing(id);
        inputRef.current.focus();
    }
    //remove all items
    const removeAllItems = () => {
        setItems([]);
        setSavedItems([]);
    }



    //on btn click save data to local storage
    const saveList = () => {
        //save data to Local Storage
        // localStorage.setItem('toToItems', JSON.stringify(items));
        // console.log(localStorage);
        // alert('saved list to localStorage');
        if (loaded) {
            set(ref(db, 'list'), [...savedItems, ...items]);
            setSavedItems([...savedItems, ...items]);
            setItems([]);
        }
        else {
            const refData = ref(db, 'list');
            let data = [];
            onValue(refData, (snapshot) => {
                data = snapshot.val();
                // console.log('saved data', data);
                // console.log('saved items', savedItems);
            })
            set(ref(db, 'list'), [...data, ...items]);

        }
        // alert('stored in database');
        toast.success('Items saved in Firebase ');
    }
    //on btn click load data from local storage
    const loadList = () => {
        // let oldList = localStorage.getItem('toToItems');
        // if (oldList) {
        //     const temp = JSON.parse(localStorage.getItem('toToItems'));
        //     setItems([...items, ...temp]);
        //     console.log(temp);
        //     alert('getting list from localStorage')
        // } else {
        //     return [];
        // }

        const refData = ref(db, 'list');
        onValue(refData, (snapshot) => {
            const data = snapshot.val();
            setSavedItems(data);
            // console.log(data);
            setLoaded(true);
        });
        toast.success('Data is loaded from firebase');
    }

    return (
        <>
            <div className='wmg-container'>
                <div className='list-wrapper'>
                    <div className='header-image'>
                        <img src={headerImage} alt="My Awesome pic" />
                    </div>
                    <div className='heading-text'>
                        <h1>
                            To Do List
                        </h1>
                    </div>
                    <form className='todo-form'>
                        <input type="text" value={inputData} ref={inputRef} placeholder='Enter to do item' onChange={(e) => setInputData(e.target.value)} />
                        {isSubmit
                            ?
                            <button onClick={addItem} className='add-item-btn form-btn' type='button'>Add</button>
                            :
                            <button onClick={addItem} className='edit-item-btn form-btn' type='button'>Edit</button>
                        }
                        {/* <input type="submit" value="Submit" /> */}
                    </form>
                    <div className='list-container'>
                        {[...savedItems, ...items].map((ele) => {

                            return (
                                <div className='list-item' key={ele.id}>
                                    <div>
                                        <h2 className='listItem-text'> {ele.name}</h2>
                                        <p className='listItem-date'>{ele.date}</p>
                                    </div>
                                    <div>
                                        <svg onClick={() => deleteCurrentItem(ele.id)} className='delete-btn svg-btn' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        <svg onClick={() => editCurrentItem(ele.id)} className='edit-btn svg-btn' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='delete-all'>
                        <button className='delete-all-btn' onClick={removeAllItems}>Delete All</button>
                    </div>
                    <div className='dynamic-btns'>
                        <button onClick={loadList} className='load-data-btn load'>Load List</button>
                        <button onClick={saveList} className='load-data-btn save'>Save All</button>
                    </div>
                </div>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000} />
        </>
    )
}

export default List