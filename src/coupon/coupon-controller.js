import { catchError, AppError } from "../../utils/error-handler.js";
import couponModel from "../../db/models/coupon-model.js";
import parseCustomDate from "../../utils/parse-custome-date.js";
import ApiFeatures from "../../utils/api-features.js";
import getKeysModel from "../../utils/get-keys-of-the-model.js";

export const createCoupon = catchError(async (req, res) => {
  let {
    code,
    discount,
    isFixed,
    isPercentage,
    fromDate,
    toDate
  } = req.body;
  // 1. Validation
  if (!code || !discount || !fromDate || !toDate) {
    throw new AppError("Missing required fields", 400);
  }

  if (isFixed === isPercentage) {
    throw new AppError("isFixed and isPercentage must not be the same", 400);
  }
 
  toDate=parseCustomDate(toDate);
  fromDate=parseCustomDate(fromDate);
  // 2. Check for existing coupon with same code
  // const existingCoupon = await couponModel.findOne({ code });
  // if (existingCoupon) {
  //   throw new AppError("Coupon code already exists", 409);
  // }

  // 3. Determine initial status
  const now = new Date();
  const status = new Date(toDate) < now ? "expired" : "active";
  // 4. Save the coupon
  const coupon = await couponModel.create({
    code,
    discount,
    isFixed,
    isPercentage,
    fromDate,
    toDate,
    status,
    addedBy: req.user?.id 
  });

  res.json({
    message: "Coupon created successfully",
    coupon
  });
});



export const getAllCoupons = catchError(async (req, res) => {
    const{id}=req.user;
  const fields=getKeysModel(couponModel);

  const apiFeatures = new ApiFeatures(couponModel.find({addedBy:id}),req.query)
  .paginate()
  .sort()
  .search()
  .limitFields()
  .filter(fields);
  const coupons = await apiFeatures.MongooseQuery;
  res.json({
    message:'Coupons fetched successfully',
    coupons
  });
});