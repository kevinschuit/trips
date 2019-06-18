import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import Datepicker from "./common/datepicker";
import enGB from "date-fns/locale/en-GB";
import styled from "styled-components";

const Filter = ({ date, onChange }) => {

    registerLocale("en-GB", enGB);

    const Wrapper = styled.div`
    background: #00459d;
    border-radius: 5px;
    padding: 5px;
    & .react-datepicker-wrapper button{
        cursor: pointer
        border: 5px solid #fff;
        color: #fff;
        &:hover{
            opacity: 0.7;
        }
    }
    `;

    return (
        <Wrapper>
            <DatePicker
                customInput={<Datepicker />}
                selected={new Date(date)}
                onChange={onChange}
                dateFormat="d MMM YYYY"
                locale="en-GB"
            />
        </Wrapper>
    );
}

export default Filter;