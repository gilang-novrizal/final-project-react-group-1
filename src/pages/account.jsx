import React from 'react'
import { Tab, Tabs, makeStyles, Box, Button, Typography, Card, CardContent, CardActions, IconButton, TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Backdrop, CircularProgress } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

import { getProfile, getFavoriteByID, userOrder, editProfile, uploadPic, getAddress, editAddress, deleteAddress, addAddress, addMainAddress, deleteFavorite } from '../action'
import { URL_IMG } from '../action/helper'
import avatar from '../assets/avatar.jpg'

// Kontainer Tab
function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            className={classes.tabPanel}
        >
            {children}
        </div>
    );
}

// Kontainer Card
function SimpleCard(props) {
    const classes = useStyles();
    const { index, order_number, status, total } = props;
    return (
        <Card className={classes.rootCard} key={index}>
            <CardContent className={classes.contentCard}>
                <Typography variant="h5">
                    {order_number}
                </Typography>
                <Typography >
                    Status : {status}
                </Typography>
                <Typography>
                    Rp. {total}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

function EditProfile(props) {
    const classes = useStyles();
    return (
        <div className={classes.divInfo}>
            <TextField id="outlined-basic"
                label="Username"
                variant="outlined" />
            <Button variant='contained' color='primary'>Edit Profile</Button>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        // display: 'flex',
        // flexDirection: 'column',
        height: 224,
        paddingTop: '10vh'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    title: {
        display: 'flex',
        padding: 10,
        marginBottom: 10
    },
    box: {
        backgroundColor: 'pink',
        height: 'auto',
    },
    // favorite style
    boxFavorite: {
        backgroundColor: 'pink',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    boxFav: {
        backgroundColor: 'pink',
        height: 250,
        display: 'grid',
        gridTemplateColumns: '20% 55% 25%',
        gridTemplateRows: '20% 80%',
        padding: 30
    },
    favTitle: {
        gridColumn: '1 / span 3',
        backgroundColor: 'lavender',
        padding: 10
    },
    favImg: {
        // height: '200',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        // padding: 10
    },
    favInfo: {
        backgroundColor: '#f2f2f2',
        paddingTop: 10,
        paddingLeft: 30
    },
    favBtn: {
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    boxProfile: {
        backgroundColor: 'pink',
        height: '60vh',
        display: 'flex',
        justifyContent: 'space-between'
    },
    divTab: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    tabs: {
        borderRight: `px solid ${theme.palette.divider}`,
        width: '13vw'
    },
    tabPanel: {
        flexBasis: '85vw'
    },
    input: {
        display: 'none',
    },
    avatar: {
        height: '200px',
        width: '200px',
        marginBottom: '20px'
    },
    divAvatar: {
        width: '200px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: '10px',
    },
    divInfo: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lavender',
        padding: '10px 40px',
        justifyContent: 'space-between'
    },
    divInfoButton: {
        display: 'flex',
        justifyContent: 'center'
    },
    // card style
    rootCard: {
        backgroundColor: 'lavender',
        display: 'flex',
        justifyContent: 'space-between'
    },
    contentCard: {
        display: 'flex'
    },
    bulletCard: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    titleCard: {
        fontSize: 14,
    },
    posCard: {
        marginBottom: 12,
    },
}));


const Account = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    const { profile, favorite, error, order, username, email, status, addressUser } = useSelector((state) => {
        return {
            profile: state.profileReducer.profile,
            favorite: state.favoriteReducer.favorite,
            error: state.profileReducer.error,
            order: state.orderReducer.order,
            username: state.userReducer.username,
            email: state.userReducer.email,
            status: state.userReducer.status,
            addressUser: state.addressReducer.address
        }
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        console.log(loading)
        dispatch(getFavoriteByID())
        dispatch(userOrder())
        dispatch(getAddress())
        setLoading(false)
    }, [])

    // fungsi untuk ganti tab
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // fungsi untuk upload picture
    const handleUpload = (props) => {
        let fileProps = props.target.files[0]
        console.log(fileProps)
        let data = new FormData()
        data.append('IMG', fileProps)
        console.log(data)
        dispatch(uploadPic(data))
    };

    // const handleEdit = (props) => {
    //     console.log(edit)
    //     setEdit(true)
    // }
    // const handleCancelEdit = (props) => {
    //     setEdit(false)
    // }

    const TabProfile = (props) => {
        // state edit profile
        const [edit, setEdit] = React.useState(false);
        const [user_fullname, setFullname] = React.useState(profile.user_fullname ? profile.user_fullname : '');
        const [phone, setPhone] = React.useState(profile.phone ? profile.phone : '');
        const [gender, setGender] = React.useState('male');

        const handleChange = (event) => {
            setGender(event.target.value);
        };
        const handleSave = () => {
            const body = { user_fullname, phone, gender }
            console.log(body)
            dispatch(editProfile(body))
            setEdit(false)
        }

        return (
            <Box p={3} className={classes.boxProfile}>
                <div className={classes.divAvatar}>
                    <div className={classes.avatar}>
                        <img src={profile.image ? URL_IMG + profile.image : avatar} width="100%" alt="profile-img" style={{ borderRadius: '50%' }}></img>
                    </div>
                    <Typography>{error ? error : ''}</Typography>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUpload}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span"
                            startIcon={<PhotoCamera />}>
                            Upload
                                </Button>
                    </label>
                    <Button variant="contained" color="primary" style={{ marginTop: 10 }}>Edit Password</Button>
                </div>
                <div className={classes.divInfo}>
                    <Typography variant='h5'>{username}</Typography>
                    <Typography variant="subtitle1">{email}</Typography>
                    <TextField id="outlined-basic"
                        label="Nama" variant='outlined' onChange={(event) => setFullname(event.target.value)} defaultValue={profile.user_fullname} disabled={edit ? false : true} />
                    <TextField id="outlined-basic"
                        label="Nomor Handphone" onChange={(event) => setPhone(event.target.value)} variant='outlined' inputMode='numeric' defaultValue={profile.phone} disabled={edit ? false : true} />
                    {edit ? (
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={gender} defaultValue={gender} onChange={handleChange}>
                                <FormControlLabel value="male" control={<Radio />} label="Laki-laki" />
                                <FormControlLabel value="female" control={<Radio />} label="Perempuan" />
                            </RadioGroup>
                        </FormControl>
                    )
                        :
                        <TextField id="outlined-basic"
                            label="Gender" variant='outlined' value={profile.gender} disabled />
                    }
                    <Typography></Typography>
                    {edit ? (
                        <div className={classes.divInfoButton}>
                            <Button style={{ marginRight: 10 }} variant='contained' color='primary' onClick={handleSave}>Save</Button>
                            <Button variant='contained' color='secondary' onClick={() => setEdit(false)}>Cancel</Button>
                        </div>
                    ) : (
                            <div className={classes.divInfoButton}>
                                <Button variant='contained' color='primary' onClick={() => setEdit(true)}>Edit Profil</Button>
                            </div>
                        )}
                </div>
            </Box>
        )
    }
    const TabAddress = (props) => {
        const [edit, setEdit] = React.useState('');
        const [index, setIndex] = React.useState('');
        const [id_address, setRadio] = React.useState(profile.main_address_id);
        // insert state
        const [addressNew, setAddressNew] = React.useState('');
        const [cityNew, setCityNew] = React.useState('');
        const [provinceNew, setProvinceNew] = React.useState('');
        const [postcodeNew, setPostcodeNew] = React.useState('');
        const [latitude, setLat] = React.useState(null);
        const [longitude, setLong] = React.useState(null);
        // edit state
        const [address, setAddress] = React.useState('');
        const [city, setCity] = React.useState('');
        const [province, setProvince] = React.useState('');
        const [postcode, setPostcode] = React.useState('');

        const handleChange = (event) => {
            console.log(event.target.value)
            setRadio(event.target.value);
            const body = { id_address: event.target.value }
            console.log(body)
            dispatch(addMainAddress(body))
        };
        const handleLoc = () => {
            const successCB = (position) => {
                console.log(position)
                let lat = position.coords.latitude
                let long = position.coords.longitude
                handleAdd(lat, long)
            }
            const errorCB = (error) => {
                console.log(error)
            }
            navigator.geolocation.getCurrentPosition(successCB, errorCB)
        }
        const handleAdd = (lat, long) => {
            let address = addressNew
            let city = cityNew
            let province = provinceNew
            let postcode = postcodeNew
            const body = { address, city, province, postcode, latitude: lat, longitude: long }
            console.log(body)
            dispatch(addAddress(body))
            // setAddressNew('')
            // setCityNew('')
            // setProvinceNew('')
            // setPostcodeNew('')
        };
        const handleDone = () => {
            const body = { address, city, province, postcode }
            console.log(body)
            dispatch(editAddress(body, index))
            setEdit(false)
        };
        const handleEdit = (index, id_address) => {
            console.log(index)
            console.log(id_address)
            setEdit(index)
            setIndex(id_address)
            setAddress(addressUser[index].address)
            setCity(addressUser[index].city)
            setProvince(addressUser[index].province)
            setPostcode(addressUser[index].postcode)
        }

        return (
            <Box p={2} className={classes.box}>
                <TableContainer component='div'>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Alamat utama</TableCell>
                                <TableCell>Alamat</TableCell>
                                <TableCell align="center">Kota</TableCell>
                                <TableCell align="center">Provinsi</TableCell>
                                <TableCell align="center">Kodepos</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addressUser.map((item, index) =>
                                edit === index ? (
                                    <TableRow key={index}>
                                        <TableCell align='center'>
                                            <Radio
                                                checked={id_address == item.id ? true : false}
                                                onChange={handleChange}
                                                value={item.id}
                                                name="radio-button"
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Alamat" variant='outlined' onChange={(event) => setAddress(event.target.value)} value={address} size='small' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Kota" variant='outlined' onChange={(event) => setCity(event.target.value)} value={city} size='small' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Provinsi" variant='outlined' onChange={(event) => setProvince(event.target.value)} value={province} size='small' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TextField id="outlined-basic"
                                                label="Kodepos" variant='outlined' onChange={(event) => setPostcode(event.target.value)} defaultValue={postcode} size='small' />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="done" color='primary' onClick={handleDone}>
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton aria-label="clear" color='secondary' onClick={() => setEdit('')}>
                                                <ClearIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                        <TableRow key={index}>
                                            <TableCell align='center'>
                                                <Radio
                                                    checked={id_address == item.id ? true : false}
                                                    onChange={handleChange}
                                                    value={item.id}
                                                    name="radio-button"
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.address}
                                            </TableCell>
                                            <TableCell align="left">{item.city}</TableCell>
                                            <TableCell align="left">{item.province}</TableCell>
                                            <TableCell align="left">{item.postcode}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="edit" color='primary' onClick={() => handleEdit(index, item.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" color='secondary' onClick={() => dispatch(deleteAddress(item.id))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                            <TableRow>
                                <TableCell align='center'>
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Alamat" variant='outlined' onChange={(event) => setAddressNew(event.target.value)} value={addressNew} size='small' required />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Kota" variant='outlined' onChange={(event) => setCityNew(event.target.value)} value={cityNew} size='small' required />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Provinsi" variant='outlined' value={provinceNew} onChange={(event) => setProvinceNew(event.target.value)} size='small' required />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField id="outlined-basic"
                                        label="Kodepos" variant='outlined' value={postcodeNew} onChange={(event) => setPostcodeNew(event.target.value)} size='small' required />
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="done" color='primary' onClick={handleLoc} >
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )

    }
    const TabFavorite = (props) => {
        const handleCart = (id) => {
            console.log(id)
        }
        if (favorite.length === 0) {
            return (
                <Box p={3} className={classes.boxFavorite}>
                    <Typography variant='h5' style={{ textAlign: 'center', marginBottom: 10 }}>Oops! Produk favoritmu kosong. Yuk Belanja!</Typography>
                    <Link to='/Produk'>
                        <Button onClick={() => console.log('test')} variant='contained'>Lihat Produk</Button>
                    </Link>
                </Box>
            )
        }
        return favorite.map((item, index) => {
            return (
                <Box p={3} className={classes.boxFav} key={index}>
                    <div className={classes.favTitle}>
                        <Typography variant='h5'>{item.name}</Typography>
                    </div>
                    <div className={classes.favImg}>
                        <img src={item.image} height="100%" width='100%' alt={item.name}></img>
                    </div>
                    <div className={classes.favInfo}>
                        <Typography variant='h5' style={{ marginBottom: 10 }}>Rp. {item.price_each}</Typography>
                        <Typography style={{ marginBottom: 10 }}>Color : {item.color}</Typography>
                        <Typography style={{ marginBottom: 10 }}>Jumlah : {item.qty}</Typography>
                    </div>
                    <div className={classes.favBtn}>
                        <Button variant="contained" color="primary" component="span" style={{ marginBottom: 10 }} onClick={() => handleCart(item.id)}
                            startIcon={<AddShoppingCartIcon />}>
                            Add to Cart
                        </Button>
                        <Button variant="contained" color="secondary" component="span"
                            startIcon={<DeleteIcon />} onClick={() => dispatch(deleteFavorite(item.id))}>
                            Hapus Favorit
                        </Button>
                    </div>
                </Box>
            )
        })
    }
    const TabHistory = (props) => {
        return order.map((item, index) => {
            return (
                <Box p={3} className={classes.box} key={index}>
                    <SimpleCard index={index} order_number={item.order_number} status={item.status} total={item.price_each * item.qty} />
                </Box>
            )
        })
    }
    const TabUser = (props) => {
        return (
            <Box p={3} className={classes.box}>
                <h1>{username}</h1>
                <h1>{email}</h1>
                <h1>{status}</h1>
                <Button onClick={() => console.log('test')}>Test</Button>
            </Box>
        )
    }
    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <div className={classes.title}>
                <Typography variant='h4'>Akun Saya</Typography>
            </div>
            <div className={classes.divTab}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Profil" />
                    <Tab label="Alamat" />
                    <Tab label="Favorit" />
                    <Tab label="Riwayat Belanja" />
                    <Tab label="Pengaturan" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TabProfile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabAddress />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TabFavorite />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TabHistory />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <TabUser />
                </TabPanel>
            </div>
        </div>
    )
}
export default Account