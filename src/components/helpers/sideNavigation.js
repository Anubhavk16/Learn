// import React from "react";
// import { Sidebar,Menu,MenuItem,SubMenu,SidebarHeader,SidebarContent,SidebarFooter } from "react-pro-sidebar";
// // import {faGem,faHeart} from "react-icons/fa";
// function sideNavigation(){
//     return(
//         // <div style={{height:"100vh"}}>
//         // {
//             <Sidebar>
//             <Menu>
//                 <MenuItem> Hello User</MenuItem>
//                 <MenuItem> Shop by category</MenuItem>
//               <SubMenu label="Electronics">
//                 <MenuItem> Smartphones </MenuItem>
//                 <MenuItem>Laptops  </MenuItem>
//               </SubMenu>
//               <SubMenu label="Beauty Products">
//                 <MenuItem> Fragnances </MenuItem>
//                 <MenuItem>Skincare  </MenuItem>
//               </SubMenu>
//               <SubMenu label="Home Decor">
//                 <MenuItem> Furniture </MenuItem>
//                 <MenuItem>Lighting  </MenuItem>
//               </SubMenu>
//               <SubMenu label="Clothing">
//                 <MenuItem> Women-Dress </MenuItem>
//                 <MenuItem>Women-Shoes  </MenuItem>
//                 <MenuItem>Men-Shirts  </MenuItem>
              
//               </SubMenu>
//               <SubMenu label="Accessories">
//               <MenuItem>Men-Watches  </MenuItem>
//                 <MenuItem>Women-Watches  </MenuItem>
//                 <MenuItem>Women-Bags  </MenuItem>
//                 <MenuItem>Women-Jewellery  </MenuItem>
//                 <MenuItem>Sunglasses  </MenuItem>
//                 </SubMenu>
//                 <SubMenu label="Automobiles">
//                     <MenuItem>Automotive</MenuItem>
//                     <MenuItem>MotorCycle </MenuItem>
//                 </SubMenu>
//               <MenuItem> Grocery </MenuItem>
              
//             </Menu>
//           </Sidebar>
//         // }
//         // </div>
//     )
// }
// export default sideNavigation;






// import React, { useEffect, useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import axios from "axios";

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

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Sidebar>
//       <Menu>
//         <MenuItem>Hello User</MenuItem>
//         <MenuItem>Shop by category</MenuItem>
//         {categories.length > 0 ? (
//           categories.map((category) => (
//             <SubMenu key={category._id} label={category.type}>
//               {category.subcategories && category.subcategories.length > 0 ? (
//                 category.subcategories.map((subcategory) => (
//                   <MenuItem key={subcategory._id}>{subcategory.type}</MenuItem>
//                 ))
//               ) : (
//                 <div>No subcategories found.</div>
//               )}
//             </SubMenu>
//           ))
//         ) : (
//           <div>No categories found.</div>
//         )}
//       </Menu>
//     </Sidebar>
//   );
// }

// export default SideNavigation;


// import React, { useEffect, useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import axios from "axios";

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

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Sidebar>
//       <Menu>
//         <MenuItem>Hello User</MenuItem>
//         <MenuItem>Shop by category</MenuItem>
//         {categories.length > 0 ? (
//           categories.map((category) => (
//             <SubMenu key={category._id} label={category.type}>
//               <MenuItem key={category._id}>{category.category}</MenuItem>
//             </SubMenu>
//           ))
//         ) : (
//           <div>No categories found.</div>
//         )}
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
        {Object.keys(groupedCategories).map((type) => (
          <SubMenu key={type} label={type}>
            {groupedCategories[type].map((category) => (
              <MenuItem key={category._id}>
                <a href="/products">
                {category.category}
                </a>
              </MenuItem>
            // <MenuItem key={<Link to='/products' onClick={(category._id)}/>}>{category.category}</MenuItem>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sidebar>
  );
}

export default SideNavigation;







