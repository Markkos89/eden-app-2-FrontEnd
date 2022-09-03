import { useEffect, useState } from "react";
import { ProjectList, TabsSelector } from "ui";

const tabs = ["All Projects", "Favourites", "Recommended"];

export interface ProjectsContainerProps {
  allProjects?: any;
  favouriteProjects?: any;
  recommendedProjects?: any;
  updateFavoriteCallback: Function;
}

export const ProjectsContainer = ({
  allProjects,
  favouriteProjects,
  recommendedProjects,
  updateFavoriteCallback,
}: ProjectsContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [favourites, setFavourites] = useState([]);

  // if (allProjects) console.log("allProjects", allProjects);
  // if (favouriteProjects) console.log("favouriteProjects", favouriteProjects);
  // if (recommendedProjects)
  //   console.log("recommendedProjects", recommendedProjects);

  useEffect(() => {
    if (favouriteProjects) {
      setFavourites(
        favouriteProjects.filter(
          (project: { favorite: boolean }) => project.favorite
        )
      );
    }
  }, [favouriteProjects]);

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        {activeTab === 0 && (
          <ProjectList
            projects={allProjects}
            favButton
            updateFavoriteCallback={updateFavoriteCallback}
            favouriteProjects={favouriteProjects}
          />
        )}
        {activeTab === 1 && <ProjectList projects={favourites} applyButton />}
        {activeTab === 2 && (
          <ProjectList projects={recommendedProjects} applyButton />
        )}
      </div>
    </div>
  );
};
