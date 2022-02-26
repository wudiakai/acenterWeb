# Input使用说明

## 引入方式

1. App注册及接收Hardkey事件广播，需要导入以下包 （废弃）

```java
import android.content.BroadcastReceiver;
import android.view.KeyEvent;
```

2. App请求捕获HardKey事件，需要导入以下包

```java
import android.car.Car;
import android.car.input.CarInputManager;
import android.view.KeyEvent;
```

## 示例代码

1. App注册及接收Hardkey事件广播（废弃）

```java
import android.content.BroadcastReceiver;
...
@Override
public void onCreate() {
	registerKeyEventBroadCast();	//注册KeyEvent广播
}

private class SampleKeyEventBroadcastReceiver extends BroadcastReceiver {
	@Override
	public void onReceive(Context context, Intent intent) {
		int keyaction = intent.getIntExtra("keyaction",-1);
		int keycode = intent.getIntExtra("keycode",0);
		int targetDisplay = intent.getIntExtra("targetDisplay",0);
		switch (keycode) {
			case KeyEvent.KEYCODE_XXX：
				//此处需实现接收到押下HardKey广播后的逻辑处理，略
				Break;
			Default:
				Break;
	}

}
//定义广播接收者
private SampleKeyEventBroadcastReceiver mKeyEventBroadcastReceiver
	= new SampleKeyEventBroadcastReceiver ();
private void registerKeyEventBroadCast() {
	// com.naaivi.action.HARD_KEY_EVENT与发送广播时的Intent一致
	IntentFilter intentFilter = new IntentFilter("com.naaivi.action.HARD_KEY_EVENT");
	registerReceiver(mKeyEventBroadcastReceiver, intentFilter);	//注册广播接收者
}
```

2. App请求捕获Hardkey事件

以请求捕获Custom key为例，其中包括响应长押事件，代码如下，

```java
import android.car.Car;
import android.car.input.CarInputManager;
...
private CarInputManager mCarInputManager;
private final class CaptureCallback implements CarInputManager.CarInputCaptureCallback {
	@Override
	public void onRotaryEvents(int targetDisplayId, List<RotaryEvent> events) {
		//此处需实现捕获到KeyEvent(Rotary key)后的逻辑处理，略
	}
	@Override
	public void onKeyEvents(int targetDisplayId, List<KeyEvent> keyEvents) {
		//此处需实现捕获到KeyEvent( Hard key)后的逻辑处理
        Log.i(TAG, "onKeyEvents event:" + events.get(0) + " this:" + this);
        KeyEvent event = events.get(0);
        int repeatCount = event.getRepeatCount();
        if (1 == repeatCount) {
            Log.i(TAG, "It's a long press key");
            //可根据event判定相应的长押事件，并处理，略
        } else if (0 == repeatCount){
            Log.i(TAG, "It's a short press key"); 
            //可根据event判定相应的短押事件，并处理，略
        } else {
            Log.e(TAG, "RepeatCount Err");
        }
	}
	@Override
	public void onCaptureStateChanged(int targetDisplayId,
		@NonNull @CarInputManager.InputTypeEnum int[] activeInputTypes) {
		//此处需实现当display type的捕获状态变更时的逻辑处理，略
	}
	@Override
	public void onCustomInputEvents(@DisplayTypeEnum int targetDisplayType,
		@NonNull List<CustomInputEvent> events) {
		//此处需实现捕获到KeyEvent(Custom key)后的逻辑处理，略
	}
}

private final CaptureCallback mCallback0 = new CaptureCallback();
@Override
public void onCreate() {
	int res = mCarInputManager.requestInputEventCapture(
                 	CarInputManager. TARGET_DISPLAY_TYPE_MAIN,
                 	new int[]{CarInputManager. INPUT_TYPE_CUSTOM_INPUT_EVENT}, 
					0, 
					mCallback0));
	if (res != mCarInputManager. NPUT_CAPTURE_RESPONSE_SUCCEEDED){
		Log.i(TAG,” requestInputEventCapture err.”);
	}
}
```

