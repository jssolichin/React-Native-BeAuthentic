// From https://medium.com/@scottdixon/react-native-creating-a-custom-module-to-upload-camera-roll-images-7a3c26bac309#.s6fqhibcv

#import "RCTBridgeModule.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import <UIKit/UIKit.h>
#import <ImageIO/ImageIO.h>

@interface ReadImageData : NSObject <RCTBridgeModule>
@end

@implementation ReadImageData

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(readImage:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  
  // Create NSURL from uri
  NSURL *url = [[NSURL alloc] initWithString:input];
  
  // Create an ALAssetsLibrary instance. This provides access to the
  // videos and photos that are under the control of the Photos application.
  ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
  
  // Using the ALAssetsLibrary instance and our NSURL object open the image.
  [library assetForURL:url resultBlock:^(ALAsset *asset) {
    
    // Create an ALAssetRepresentation object using our asset
    // and turn it into a bitmap using the CGImageRef opaque type.
    CGImageRef imageRef = [[asset defaultRepresentation] fullResolutionImage];
    
    CGSize size = [[asset defaultRepresentation] dimensions];
    
    CGImageRef subImageRef = CGImageCreateWithImageInRect(imageRef, CGRectMake(size.width/2, size.height/2, 862, 862)); //572x862
    UIImage *croppedImage = [UIImage imageWithCGImage:subImageRef];
    
    // Create UIImageJPEGRepresentation from CGImageRef
    NSData *imageData = UIImageJPEGRepresentation(croppedImage, 1);
    
    // Convert to base64 encoded string
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
    
    callback(@[base64Encoded]);
    
  } failureBlock:^(NSError *error) {
    NSLog(@"that didn't work %@", error);
  }];
  
  
  
}
@end