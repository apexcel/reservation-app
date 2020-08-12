import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURLAtom } from '../../../atoms/globalAtoms.ts'
import { useRecoilValue } from 'recoil'

export default function Searched({ username }) {
    const [willSearch, setWillSearch] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const baseURL = useRecoilValue(baseURLAtom);

    console.log(username)

    useEffect(() => {
        const fetchFromAPI = async () => {
            setIsLoading(true);
            try {
                const result = await axios.get(`${baseURL}/api/userinfo/find/${username}`).then(res => setWillSearch(res.data));
                console.log(result)
            }
            catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        }
        if (username) {
            fetchFromAPI();
        }
        console.log(willSearch)
    }, [username])

    useEffect(() => {
        console.log(willSearch)
    }, [willSearch])

    const renderData = () => {
        console.log(willSearch.fullname)
        return (
            <div>
                <div>
                    {willSearch.username}
                </div>
                    {willSearch.fullname}
                <div>
                    {willSearch.dob}
                </div>
                <div>
                    {willSearch.tel}
                </div>
                <div>
                    {willSearch.lessons}
                </div>
                <div>
                    {willSearch.reservations}
                </div>
            </div>
        )
    }

    return (
        <>
            {isLoading ? 'loading...' :
                (Object.keys(willSearch).length > 0 ? renderData() : 'error')
            }
        </>
    )
}