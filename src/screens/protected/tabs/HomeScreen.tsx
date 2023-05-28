import React from 'react';

import { DefaultScreen, FoodCategorieList, MyLocation} from '#src/components';

export default function HomeScreen({ navigation }) {
    return (
        <DefaultScreen>
            <MyLocation />
            <FoodCategorieList />
        </DefaultScreen>
    );
}