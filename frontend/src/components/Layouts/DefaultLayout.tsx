import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/AuthProvider";
import api from "../../api/api";
import PageHeader from "../HomePage/PageHeader";
import CategoryPills from "../HomePage/CategoryPills";
import { categories, videos } from "../../temp/home";
import { useState } from "react";
import VideoGridItem from "../HomePage/VideoGridItem";
import SideBar from "../HomePage/SideBar";

export default function DefaultLayout() {
  const { token, user } = useStateContext();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  if (!token) {
    return <Navigate to={"login"} />;
  }

  const logout = () => {
    api
      .logout()
      .then(() => {
        setUser({});
        setToken(null);
        localStorage.removeItem("ACCESS_TOKEN");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  // return (
  //   <div id="default-layout">
  //     <div>
  //       <div className="content">
  //         <header>
  //           <h1 className="text-3xl font-bold">Hello world!</h1>
  //           <div>User Info {user?.name}</div>
  //           <a href="#" className="btn-logout" onClick={logout}>
  //             Logout
  //           </a>
  //         </header>
  //       </div>
  //       <main>
  //         <Outlet />
  //       </main>
  //     </div>
  //   </div>
  // );

  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <SideBar />
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills categories={categories}  selectedCategory={selectedCategory} onSelect={setSelectedCategory}/>
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (<VideoGridItem key={video.id} {...video} postAt={new Date("2023-08-29")} />))}
          </div>
        </div>
      </div>
    </div>
  )
}
