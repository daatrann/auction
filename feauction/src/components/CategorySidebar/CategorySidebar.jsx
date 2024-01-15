import React, { useContext } from 'react';
import './CategorySidebar.scss';
import CategoriesData from './CategoriesData.json';
import CategoryItem from './CategoryItem/CategoryItem';
import { TagContext } from '../BlogMain/BlogMain';

const CategorySidebar = () => {
    const { tagContextValue } = useContext(TagContext);
    return (
        <div className="box-sidebar bg-gray-850 border-gray-800">
            <div className="head-sidebar">
                <h5 className="line-bottom">Other tags you should try</h5>
            </div>
            <div className="content-sidebar">
                <div className="list-cats">
                    {tagContextValue.slice(0, 5).map((data, index) => {
                        return <CategoryItem key={index} data={data} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategorySidebar;
