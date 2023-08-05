







// import React, { useEffect, useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import axios from "axios";
// import { Link } from 'react-router-dom'

// function SideNavigation() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/getCategories');
//         setCategories(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('An error occurred while fetching data.');
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     // Store the category ID in local storage
//     localStorage.setItem("selectedCategoryId", categoryId);
//   };

//   // Group categories by type
//   const groupedCategories = {};
//   for (const category of categories) {
//     const { type } = category;
//     if (!groupedCategories[type]) {
//       groupedCategories[type] = [];
//     }
//     groupedCategories[type].push(category);
//   }

//   return (
//     <Sidebar>
//       <Menu>
//         <MenuItem>Hello User</MenuItem>
//         <MenuItem>Shop by category</MenuItem>
//         {Object.keys(groupedCategories).map((type) => (
//           <SubMenu key={type} label={type}>
//             {groupedCategories[type].map((category) => (
//               <MenuItem key={category._id}>
//                 <Link to="/products" onClick={() => handleCategoryClick(category._id)}>
//                   {category.category}
//                 </Link>
//               </MenuItem>
//             ))}
//           </SubMenu>
//         ))}
//       </Menu>
//     </Sidebar>
//   );
// }

// export default SideNavigation;




import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import axios from "axios";
import { Link } from 'react-router-dom'

function SideNavigation() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getCategories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Store the category ID in local storage
    localStorage.setItem("selectedCategoryId", categoryId);
  };

  // Group categories by type
  const groupedCategories = {};
  for (const category of categories) {
    const { type } = category;
    if (!groupedCategories[type]) {
      groupedCategories[type] = [];
    }
    groupedCategories[type].push(category);
  }

  return (
    <Sidebar>
      <Menu>
        <MenuItem>Hello User</MenuItem>
        <MenuItem>Shop by category</MenuItem>
        {loading ? (
          <MenuItem>Loading...</MenuItem>
        ) : error ? (
          <MenuItem>{error}</MenuItem>
        ) : (
          Object.keys(groupedCategories).map((type) => (
            <SubMenu key={type} label={type}>
              {groupedCategories[type].map((category) => (
                <MenuItem key={category._id}>
                  <Link to="/products" onClick={() => handleCategoryClick(category._id)}>
                    {category.category}
                  </Link>
                </MenuItem>
              ))}
            </SubMenu>
          ))
        )}
      </Menu>
    </Sidebar>
  );
}

export default SideNavigation;

