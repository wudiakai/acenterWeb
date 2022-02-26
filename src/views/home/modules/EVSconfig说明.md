# EVS config说明

## config文件位置

packages\services\Car\service\res\values\config.xml

## config主要内容

    <!-- A name of a camera device that provides the rearview through EVS service -->
    <string name="config_evsRearviewCameraId" translatable="false">/dev/video2</string>
    
    <!-- The camera Activity name for EVS, if defined, the Activity will be launched by
         CarEvsService. -->
    <string name="config_evsCameraActivity" translatable="false"></string>
1.config_evsRearviewCameraId

后摄像头的配置，打开设备节点为/dev/video2

2.config_evsCameraActivity

目前没有配置设备节点，可以通过设置属性触发开启摄像头

## EVS service调用

        /** Creates an Extended View System service instance given a {@link Context}. */
        public CarEvsService(Context context, EvsHalService halService,
                CarPropertyService propertyService) {
            mContext = context;
            mPropertyService = propertyService;
            mEvsHalService = halService;
    
            String activityName =   mContext.getResources().getString(R.string.config_evsCameraActivity);
            if (!activityName.isEmpty()) {
                mEvsCameraActivity = ComponentName.unflattenFromString(activityName);
            } else {
                mEvsCameraActivity = null;
            }
            if (DBG) Slog.d(TAG_EVS, "evsCameraActivity=" + mEvsCameraActivity);
        }
        /**
         * Gets an identifier of a current camera device for the rearview.
         *
         * <p>Requires {@link android.car.Car.PERMISSION_MONITOR_CAR_EVS_STATUS} permissions to
         * access.
         *
         * @return A string identifier of current rearview camera device.
         */
        @NonNull
        public String getRearviewCameraIdFromCommand() {
            ICarImpl.assertPermission(mContext, Car.PERMISSION_MONITOR_CAR_EVS_STATUS);
            if (mUseCameraIdOverride) {
                return mCameraIdOverride;
            } else {
                return mContext.getString(R.string.config_evsRearviewCameraId);
            }
        }
