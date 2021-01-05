import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/hoc/layout";
import { connect, useStore } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import ReactCrop from "react-image-crop";
import { MdModeEdit } from "react-icons/md";
import { Accordion, Icon, Button } from "semantic-ui-react";
import {
  isLoggedIn,
  checkMerchant,
  fetchMerchantData,
  getPresignedBannerURL,
} from "../store/helpers";
import ShopMenu from "../components/myShop/shopMenu";
import { Orders, Products, StoreDetails, Payments } from "../components/myShop";
import { LargeLoader } from "../components/loaders";

const Page = ({ router, myShop, setMerchantData }) => {
  let bannerImgSrc = myShop.info
    ? `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${myShop.info.MerchantId}/banner`
    : "";
  let bannerImgURL = `url(${bannerImgSrc})`;
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);
  const [checkedAuth, updateCheckedAuth] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [merchantDataExists, setMerchantDataExists] = useState(
    Object.keys(myShop).length > 0
  );
  const [bannerUpload, setBannerUpload] = useState(bannerImgSrc);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 800,
    height: 450,
  });
  const bannerInput = useRef(null);

  async function callFetchMerchData() {
    try {
      let resp = await fetchMerchantData();
      setMerchantData(resp.data);
      setMerchantDataExists(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
    updateCheckedAuth(true);

    if (!merchantDataExists) {
      callFetchMerchData();
    }
  }, []);

  if ((!loggedIn || !isMerchant) && checkedAuth) {
    router.push("/");
  }

  const uploadBanner = async () => {
    try {
      const resp = await getPresignedBannerURL(myShop.info.MerchantId);
      console.log(resp);
      // if (resp.data) {
      //   await uploadAvatar(avatarUpload, resp.data);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      {myShop.info ? (
        <div className="my-account-container">
          <div
            style={{
              backgroundPosition: "center",
              bakcgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: bannerImgURL,
              height: "400px",
              borderRadius: "10px",
              marginBottom: "20px",
              padding: "30px",
              position: "relative",
            }}
          >
            <h2 className="w-full">{myShop.info.name}</h2>
            <input
              onChange={(e) => {
                if (FileReader && e.target.files && e.target.files.length) {
                  var fr = new FileReader();
                  fr.onload = function () {
                    // set temp image
                    // setProfileImgSrc(fr.result);
                  };
                  // console.log(e.target.files[0]);
                  // console.log(URL.createObjectURL(e.target.files[0]));
                  setBannerUpload(URL.createObjectURL(e.target.files[0]));
                  fr.readAsDataURL(e.target.files[0]);
                } else {
                  console.log("No file reader");
                }
              }}
              type="file"
              id="bannerInput"
              ref={bannerInput}
              style={{ display: "none" }}
            />
            <Button
              className="edit-banner-btn inverted"
              onClick={() => {
                bannerInput.current.click();
              }}
            >
              <span className="mr-2 ">Edit</span>
              <MdModeEdit
                onClick={() => console.log("CLICKED")}
                className="inline cursor-pointer"
              />
            </Button>
            <Button
              className="save-banner-btn inverted"
              onClick={() => {
                uploadBanner();
              }}
            >
              <span className="">Save</span>
            </Button>
          </div>
          <ReactCrop
            src={bannerUpload}
            crop={crop}
            onChange={(newCrop) =>
              setCrop({ ...newCrop, unit: "px", width: 800, height: 450 })
            }
          />
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
            >
              <Icon name="dropdown" />
              Orders
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Orders orders={myShop.orders} />
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={() => setActiveIndex(activeIndex === 1 ? -1 : 1)}
            >
              <Icon name="dropdown" />
              Products
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Products products={myShop.products} />
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={() => setActiveIndex(activeIndex === 2 ? -1 : 2)}
            >
              <Icon name="dropdown" />
              Shop Details
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <StoreDetails
                info={myShop.info}
                callFetchMerchData={callFetchMerchData}
              />
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 3}
              index={3}
              onClick={() => setActiveIndex(activeIndex === 3 ? -1 : 3)}
            >
              <Icon name="dropdown" />
              Payments
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <Payments />
            </Accordion.Content>
          </Accordion>
        </div>
      ) : (
        <LargeLoader />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    setMerchantData: (data) => dispatch(actions.setMerchantData(data)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
