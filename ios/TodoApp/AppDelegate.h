#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Firebase.h>
#import <UserNotifications/UNUserNotificationCenter.h>

#import <RNAnimatedSplash/Splash.h>
@class Splash;
#import <RNAnimatedSplash/GroupAnimation.h>
@class GroupAnimation;
#import <RNAnimatedSplash/SingleAnimation.h>
@class SingleAnimation;
#import <RNAnimatedSplash/HideGroupAnimation.h>
@class HideGroupAnimation;
#import <RNAnimatedSplash/HideSingleAnimation.h>
@class HideSingleAnimation;
#import <RNAnimatedSplash/ObjectAnimation.h>
@class ObjectAnimation;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
@property (nonatomic, strong) UIWindow *window;
@end
