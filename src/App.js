
import {  useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

function App() {
  const [value, setValue] = useState('')
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(false)
 
  const [filter, setFilter] = useState(false)

  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleClick = async () => {
    if (value.length !== 6) {
      setMessage('Postal code must be 6 digits.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
      const data = await res.json();

      if (data[0].Status === 'Error') {
        setMessage(data[0].Message);
        setPost([]);
      } else {
        setPost(data[0].PostOffice);
        setMessage(data[0].Message);
        setFilter(true);
      }
    } catch (error) {
      setMessage('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    let input = e.target.value;
    let filteredPost = post.filter((item) => {
      return item.Name.toLowerCase().includes(input.toLowerCase());
    });

    if (filteredPost.length === 0) {
      setMessage("Couldn’t find the postal data you’re looking for…");
    } else {
      setMessage('');
    }

    setPost(filteredPost);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <section className="main">
      {!filter ? (
        <div className="pincode-container">
          <b>Enter pin code</b>
          <input
            type="number"
            placeholder="Pincode"
            id="input"
            onChange={handleChange}
          />
          <div>
            <button className="btn" onClick={handleClick}>
              Lookup
            </button>
            {message && <div>{message}</div>}
          </div>
        </div>
      ) : (
        <>
          <div className="message">
            <b>pin code:{value}</b>
            <p>
              <b>Message</b>
              {message}
            </p>
            <div className="search-container">
              <IoSearchSharp />
              <input
                type="text"
                placeholder="filter"
                id="filter"
                onChange={handleFilter}
              />
            </div>
          </div>
          <div className="card-container">
            {/* error handling */}
            {post.length <= 0 && <h1>No Items Found</h1>}
            {post.map((item, index) => {
              const { DeliveryStatus, Name, BranchType, District, State } = item
              return (
                <div className="card" key={index}>
                  <p>
                    <b>Name:</b> {Name}
                  </p>
                  <p>
                    <b>Type:</b>Branch {BranchType}
                  </p>
                  <p>
                    <b>Delivery Status :</b> {DeliveryStatus}
                  </p>
                  <p>
                    <b>District:</b> {District}
                  </p>
                  <p>
                    <b>State:</b> {State}
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

export default App
