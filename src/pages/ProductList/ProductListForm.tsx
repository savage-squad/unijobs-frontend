import React, { Fragment, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import api from "../../services/api";
import ScrollToTopOnMount from "../../utils/ScrollToTopOnMount";
import { Content } from "../Product/styles";

interface Params {
    search?: string
}

interface IProduct {
    id_produto: number,
    titulo: string,
    descricao: string
}

const ProductFormList = () => {
    const { search } = useParams<Params>();

    useEffect(() => {
        api.get<IProduct>(`/produtos/${search}/search`)
            .then(products => {
                console.log(products)
            })
    }, [search])

    return (
        <Fragment>
            <ScrollToTopOnMount />
            <Loading loading={false} />
            <Banner backIcon />
            <Content>
                {search}
            </Content>
            <Footer />
        </Fragment>
    )
}


export default ProductFormList;
