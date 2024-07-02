import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col, Row } from 'react-bootstrap'
import {  FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch} = useGetProductsQuery()
    const [createProduct, { isLoading: loadingCreate}] = useCreateProductMutation()
    const [deleteProduct, { isLoading: loadingDelete}] = useDeleteProductMutation()

    const deleteHandler = async (id) =>{
        if(window.confirm('Are you sure?')){
            try {
                await deleteProduct(id) 
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err?.error)
            }  
        }
    }

const createProductHandler = async() =>{
    if(window.confirm("Are you sure you want to create a new Product?")){
        try{
            await createProduct()
            toast.success('Product deleted!')
            refetch()
        }catch(err){
            toast.error(err?.data?.message || err?.error)
        }
    }
}
  return (
    <>
   <Row className="align-items-center">
    <Col>
        <h1>Products</h1>
    </Col>
    <Col className="text-end">
        <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit/> Create Product
        </Button>
    </Col>
   </Row>
   {
    loadingCreate && <Loader/>
   }
   {
    loadingDelete && <Loader/>
   }
   {
    isLoading ?  <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
        <Table striped responsive hover className="table-sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                products.map((product)=>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                      
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button className="btn-sm mx-2" variant="light">
                            <FaEdit/>    
                            </Button>    
                            </LinkContainer> 
                            <Button className="btn-sm mx-2" variant="danger" onClick={()=> deleteHandler(product._id)}>
                            <FaTrash style={{color: 'white'}}/>    
                            </Button>   
                        </td>
                    </tr>
                ))
            }
        </tbody>
      </Table>
    )
   }
   </>
  )
}

export default ProductListScreen