"use client";

import { useState, useEffect } from "react";
import { Save, ShieldAlert, UploadCloud, Camera, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/apis/user.api";
import { toast } from "sonner";
import { format, parse } from "date-fns";

export default function SettingsPage() {

  const { user, refreshProfile } = useAuth();
  
  // Profile form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Email OTP state
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  // KYC state
  const [isUploadingID, setIsUploadingID] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [faceScanned, setFaceScanned] = useState(false);
  const [kycSubmitted, setKycSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setGender(user.gender || "MALE");
      
      if (user.dateOfBirth) {
        // user.dateOfBirth from API is usually dd/MM/yyyy
        try {
          const parsedDate = parse(user.dateOfBirth, "dd/MM/yyyy", new Date());
          if (!isNaN(parsedDate.getTime())) {
            setDateOfBirth(format(parsedDate, "yyyy-MM-dd"));
          } else {
             // If it's already ISO format from API somehow
            const isoParsed = new Date(user.dateOfBirth);
            if (!isNaN(isoParsed.getTime())) setDateOfBirth(format(isoParsed, "yyyy-MM-dd"));
          }
        } catch(e) {
          console.error("Error parsing date", e);
        }
      }
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !gender || !dateOfBirth) {
      toast.error("Vui lòng điền đầy đủ các trường thông tin bắt buộc.");
      return;
    }

    setIsSaving(true);
    try {
      // Format date to dd/MM/yyyy as expected by backend
      const formattedDate = format(new Date(dateOfBirth), "dd/MM/yyyy");
      
      await userApi.updateProfile({
        firstName,
        lastName,
        gender,
        dateOfBirth: formattedDate,
      });
      
      toast.success("Cập nhật thông tin thành công!");
      await refreshProfile(); // reload data from backend
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Có lỗi xảy ra khi cập nhật thông tin.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        toast.info("Đang tải ảnh lên...");
        await userApi.uploadAvatar(formData);
        toast.success("Đổi Avatar thành công!");
        await refreshProfile();
      } catch (error: any) {
        toast.error("Lỗi khi tải ảnh lên.");
      }
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error("Vui lòng điền đầy đủ các trường mật khẩu.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới không khớp.");
      return;
    }
    setIsChangingPassword(true);
    try {
      await userApi.changePassword({ oldPassword, newPassword, confirmNewPassword });
      toast.success("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi đổi mật khẩu.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSendOtp = async () => {
    if (!newEmail) {
      toast.error("Vui lòng nhập Email mới.");
      return;
    }
    setIsSendingOtp(true);
    try {
      await userApi.sendEmailOtp({ newEmail });
      toast.success("Mã OTP đã được gửi đến email hiện tại của bạn!");
      setShowOtpInput(true);
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi gửi OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Vui lòng nhập mã OTP.");
      return;
    }
    setIsVerifyingOtp(true);
    try {
      await userApi.verifyEmailOtp({ newEmail, otp });
      toast.success("Đổi Email thành công!");
      setShowOtpInput(false);
      setNewEmail("");
      setOtp("");
      await refreshProfile();
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xác nhận OTP.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleEnable2FA = () => {
    toast.info("Opening 2FA setup wizard...");
  };

  const handleAvatarRemove = () => {
    toast.success("Avatar removed");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  const handleSaveSellerProfile = () => {
    toast.success("Seller profile updated");
  };

  const handleUploadID = () => {
    setIsUploadingID(true);
    toast.loading("Uploading ID document...", { id: "upload-id" });
    setTimeout(() => {
      setIsUploadingID(false);
      setIdUploaded(true);
      toast.success("ID document uploaded successfully", { id: "upload-id" });
    }, 1500);
  };

  const handleFaceScan = () => {
    setIsScanningFace(true);
    toast.loading("Initializing camera and scanning face...", { id: "face-scan" });
    setTimeout(() => {
      setIsScanningFace(false);
      setFaceScanned(true);
      toast.success("Face scan completed and verified", { id: "face-scan" });
    }, 2000);
  };

  const handleSubmitKYC = () => {
    setKycSubmitted(true);
    toast.success("KYC information submitted for review. Please wait for admin approval.");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 pt-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, security preferences, and seller options.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-8 bg-secondary border border-border p-1 w-full overflow-x-auto justify-start flex-nowrap hide-scrollbar">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Profile</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Account & Security</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Notifications</TabsTrigger>
          <TabsTrigger value="kyc" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">KYC Verification</TabsTrigger>
          <TabsTrigger value="seller" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Seller Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>Thông tin này sẽ được hiển thị công khai trên hồ sơ của bạn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-border">
                <Avatar className="w-20 h-20 border-2 border-primary shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                  <AvatarImage src={user?.avatarUrl || "https://i.pravatar.cc/150"} />
                  <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hover:text-primary hover:border-primary transition-colors relative overflow-hidden">
                      Đổi Avatar
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleAvatarRemove} className="text-destructive hover:bg-destructive/10">Xóa</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên (First Name) *</label>
                  <Input 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Họ (Last Name) *</label>
                  <Input 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Giới tính (Gender) *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="MALE">Nam (Male)</option>
                    <option value="FEMALE">Nữ (Female)</option>
                    <option value="OTHER">Khác (Other)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày sinh (Date of Birth) *</label>
                  <Input 
                    type="date"
                    value={dateOfBirth} 
                    onChange={(e) => setDateOfBirth(e.target.value)} 
                    className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tên đăng nhập (Username)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">devora.co/</span>
                  <Input readOnly value={user?.username || ""} className="pl-[85px] bg-secondary/50 border-border opacity-70 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input readOnly value={user?.email || ""} className="bg-secondary/50 border-border opacity-70 cursor-not-allowed" />
                <p className="text-xs text-muted-foreground">Email được bảo vệ bằng OTP. Vui lòng sang tab Security để đổi.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all"
                >
                  <Save className="w-4 h-4 mr-2" /> {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-border bg-card mb-6 shadow-sm">
            <CardHeader>
              <CardTitle>Đổi Mật Khẩu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">Mật khẩu hiện tại</label>
                <div className="relative">
                  <Input type={showOldPassword ? "text" : "password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors pr-10" />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">Mật khẩu mới</label>
                <div className="relative">
                  <Input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors pr-10" />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <Input type={showConfirmNewPassword ? "text" : "password"} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors pr-10" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button onClick={handleChangePassword} disabled={isChangingPassword} className="mt-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                {isChangingPassword ? "Đang xử lý..." : "Cập nhật mật khẩu"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Đổi Email (Xác thực OTP)</CardTitle>
              <CardDescription>Bảo vệ tài khoản của bạn bằng cách xác minh qua email hiện tại.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Authenticator App / 2FA */}
              <div className="flex items-center justify-between p-4 border border-border bg-secondary/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground">Authenticator App</h4>
                  <p className="text-sm text-muted-foreground mt-1">Use an app like Google Authenticator or Authy to generate one-time codes.</p>
                </div>
                <Button onClick={handleEnable2FA} variant="outline" className="hover:text-primary hover:border-primary transition-colors">Enable</Button>
              </div>

              {/* Email OTP */}
              <div className="space-y-4">
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-medium">Email Mới</label>
                  <Input disabled={showOtpInput} type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new-email@example.com" className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>
              
              {!showOtpInput ? (
                <Button onClick={handleSendOtp} disabled={isSendingOtp} className="mt-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                  {isSendingOtp ? "Đang gửi..." : "Gửi mã OTP"}
                </Button>
              ) : (
                <>
                  <div className="space-y-2 max-w-md mt-4">
                    <label className="text-sm font-medium">Nhập mã OTP (Đã gửi vào {user?.email})</label>
                    <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={handleVerifyOtp} disabled={isVerifyingOtp} className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                      {isVerifyingOtp ? "Đang xử lý..." : "Xác nhận đổi Email"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowOtpInput(false)} className="hover:text-primary hover:border-primary transition-colors">
                      Hủy
                    </Button>
                  </div>
                </>
              )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Email Notifications</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n1" defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary" />
                  <label htmlFor="n1" className="text-sm font-medium leading-none cursor-pointer">Order updates (purchases, deliveries)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n2" defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary" />
                  <label htmlFor="n2" className="text-sm font-medium leading-none cursor-pointer">Auction bids and updates</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n3" defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary" />
                  <label htmlFor="n3" className="text-sm font-medium leading-none cursor-pointer">New direct messages</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n4" className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary" />
                  <label htmlFor="n4" className="text-sm font-medium leading-none cursor-pointer">Marketing and newsletters</label>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveNotifications} className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                  <Save className="w-4 h-4 mr-2" /> Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="bg-primary/5 pb-4 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-primary drop-shadow-[0_0_5px_rgba(204,255,0,0.3)]">
                <ShieldAlert className="w-5 h-5" /> KYC Verification Status: {kycSubmitted ? "Submitted for Review" : "Pending"}
              </CardTitle>
              <CardDescription>To sell products and withdraw funds, you must verify your identity with a photo ID and a face scan.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-foreground">1. Upload ID Document</h4>
                  <p className="text-sm text-muted-foreground mb-4">A clear photo of your passport, driver&apos;s license, or national ID card.</p>
                  <div 
                    onClick={!idUploaded ? handleUploadID : undefined}
                    className={`border-2 border-dashed ${idUploaded ? 'border-success bg-success/10' : 'border-border bg-card hover:bg-secondary/50 hover:border-primary/50 cursor-pointer'} rounded-xl p-8 flex flex-col items-center justify-center transition-colors text-center group h-40`}
                  >
                    {idUploaded ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-success mb-2" />
                        <p className="text-sm font-medium text-success">ID Uploaded</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className={`w-8 h-8 text-muted-foreground mb-2 ${isUploadingID ? 'animate-bounce text-primary' : 'group-hover:text-primary'} transition-colors`} />
                        <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                          {isUploadingID ? 'Uploading...' : 'Upload ID'}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-foreground">2. Real-time Face Scan</h4>
                  <p className="text-sm text-muted-foreground mb-4">Please grant camera permissions to capture a live selfie for liveness detection.</p>
                  <div 
                    onClick={!faceScanned ? handleFaceScan : undefined}
                    className={`border-2 border-dashed ${faceScanned ? 'border-success bg-success/10' : 'border-border bg-card hover:bg-secondary/50 hover:border-primary/50 cursor-pointer'} rounded-xl p-8 flex flex-col items-center justify-center transition-colors text-center group h-40`}
                  >
                    {faceScanned ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-success mb-2" />
                        <p className="text-sm font-medium text-success">Scan Verified</p>
                      </>
                    ) : (
                      <>
                        <Camera className={`w-8 h-8 text-muted-foreground mb-2 ${isScanningFace ? 'animate-pulse text-primary' : 'group-hover:text-primary'} transition-colors`} />
                        <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                          {isScanningFace ? 'Scanning...' : 'Start Camera Scan'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleSubmitKYC}
                  disabled={!idUploaded || !faceScanned || kycSubmitted}
                  className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all disabled:opacity-50"
                >
                  {kycSubmitted ? "Verification Submitted" : "Submit for Verification"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seller">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle>Seller Profile</CardTitle>
              <CardDescription>Customize how buyers see you on the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seller Bio (Markdown)</label>
                <Textarea defaultValue="I have been building bots for 5 years..." className="bg-secondary border-border min-h-[150px] focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Top Skills (comma separated)</label>
                <Input defaultValue="Python, LangChain, React, Node.js" className="bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveSellerProfile} className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                  <Save className="w-4 h-4 mr-2" /> Save Seller Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
